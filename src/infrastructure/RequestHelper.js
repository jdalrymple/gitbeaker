import Humps from 'humps';
import LinkParser from 'parse-link-header';
import QS from 'qs';
import URLJoin from 'url-join';
import StreamableRequest from 'request';

function defaultRequest(
  { url, useXMLHttpRequest },
  endpoint,
  { headers, body, qs, formData, resolveWithFullResponse = false },
) {
  const params = {
    url: URLJoin(url, endpoint),
    headers,
    json: true,
  };

  if (body) params.body = Humps.decamelizeKeys(body);
  if (qs) {
    if (useXMLHttpRequest) {
      // The xhr package doesn't have a way of passing in a qs object until v3
      params.url = URLJoin(params.url, `?${QS.stringify(Humps.decamelizeKeys(qs))}`);
    } else params.qs = Humps.decamelizeKeys(qs);
  }
  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

  return params;
}

function getStream(service, endpoint, options = {}) {
  if (service.useXMLHttpRequest) {
    throw new Error('Cannot use streaming functionality with XMLHttpRequest. Please instantiate without this option to use streaming');
  }

  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: options,
  });

  return StreamableRequest.get(requestOptions);
}

async function getPaginated(service, endpoint, options = {}) {
  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: options,
    resolveWithFullResponse: true,
  });

  const response = await service.requester.get(requestOptions);
  const links = LinkParser(response.headers.link);
  const page = response.headers['x-page'];
  const limit = options.maxPages ? page < options.maxPages : true;
  let more = [];

  if (page && limit && links.next) {
    more = await RequestHelper.get(service, links.next.url.replace(service.url, ''), options);

    return [...response.body, ...more];
  }

  return response.body;
}

class RequestHelper {
  static async get(service, endpoint, options = {}, { stream = false } = {}) {
    if (stream) return getStream(service, endpoint, options);

    return getPaginated(service, endpoint, options);
  }

  static post(service, endpoint, options = {}, form = false) {
    const body = form ? 'fromData' : 'body';

    return service.requester.post(
      defaultRequest(service, endpoint, {
        headers: service.headers,
        [body]: options,
      }),
    );
  }

  static put(service, endpoint, options = {}) {
    return service.requester.put(
      defaultRequest(service, endpoint, {
        headers: service.headers,
        body: options,
      }),
    );
  }

  static delete(service, endpoint, options = {}) {
    return service.requester.delete(
      defaultRequest(service, endpoint, {
        headers: service.headers,
        qs: options,
      }),
    );
  }
}

export default RequestHelper;

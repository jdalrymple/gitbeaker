import Humps from 'humps';
import LinkParser from 'parse-link-header';
import QS from 'qs';
import URLJoin from 'url-join';

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

class RequestHelper {
  static async get(service, endpoint, options = {}) {
    const response = await service.requester.get(defaultRequest(service, endpoint, {
      headers: service.headers,
      qs: options,
      resolveWithFullResponse: true,
    }));

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

  static streamGet(service, endpoint, options = {}) {
    return service.streamRequester.get(defaultRequest(service, endpoint, {
      headers: service.headers,
      qs: options,
    }));
  }

  static post(service, endpoint, options = {}, form = false) {
    const body = form ? 'fromData' : 'body';

    return service.requester.post(defaultRequest(service, endpoint, {
      headers: service.headers,
      [body]: options,
    }));
  }

  static put(service, endpoint, options = {}) {
    return service.requester.put(defaultRequest(service, endpoint, {
      headers: service.headers,
      body: options,
    }));
  }

  static delete(service, endpoint, options = {}) {
    return service.requester.delete(defaultRequest(service, endpoint, {
      headers: service.headers,
      qs: options,
    }));
  }
}

export default RequestHelper;

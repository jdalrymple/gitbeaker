import Humps from 'humps';
import LinkParser from 'parse-link-header';
import QS from 'qs';
import URLJoin from 'url-join';
import StreamableRequest from 'request';

function defaultRequest(
  { url, useXMLHttpRequest },
  endpoint,
  {
    headers,
    body,
    qs,
    formData,
    resolveWithFullResponse = false,
  },
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
  const { showPagination, maxPages, ...queryOptions } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: queryOptions,
    resolveWithFullResponse: true,
  });

  const response = await service.requester.get(requestOptions);
  const links = LinkParser(response.headers.link) || {};
  const page = response.headers['x-page'];
  const underMaxPageLimit = maxPages ? page < maxPages : true;
  let more = [];

  // If not looking for a singular page and still under the max pages limit
  // AND their is a next page, paginate
  if (!queryOptions.page && underMaxPageLimit && links.next) {
    more = await getPaginated(service, links.next.url.replace(service.url, ''), options);
  }

  const data = Array.isArray(response.body) ? [...response.body, ...more] : response.body;

  if (!queryOptions.page && showPagination) {
    return {
      data,
      pagination: {
        perPage: response.headers['x-per-page'],
        next: response.headers['x-next-page'],
        current: response.headers['x-page'],
        previous: response.headers['x-prev-page'],
        total: response.headers['x-total-pages'],
      },
    };
  }

  return data;
}

class RequestHelper {
  static async get(service, endpoint, options = {}, { stream = false } = {}) {
    if (stream) return getStream(service, endpoint, options);

    return getPaginated(service, endpoint, options);
  }

  static post(service, endpoint, options = {}, form = false) {
    const body = form ? 'formData' : 'body';
    const requestOptions = defaultRequest(service, endpoint, {
      headers: service.headers,
      [body]: options,
    });

    return service.requester.post(requestOptions);
  }

  static put(service, endpoint, options = {}) {
    const requestOptions = defaultRequest(service, endpoint, {
      headers: service.headers,
      body: options,
    });

    return service.requester.put(requestOptions);
  }

  static delete(service, endpoint, options = {}) {
    const requestOptions = defaultRequest(service, endpoint, {
      headers: service.headers,
      qs: options,
    });

    return service.requester.delete(requestOptions);
  }
}

export default RequestHelper;

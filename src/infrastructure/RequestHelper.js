import Humps from 'humps';
import LinkParser from 'parse-link-header';
import QS from 'qs';
import URLJoin from 'url-join';
import StreamableRequest from 'request';

function defaultRequest(
  { url, useXMLHttpRequest, rejectUnauthorized },
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
    } else {
      params.qs = Humps.decamelizeKeys(qs);
    }
  }

  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

  params.rejectUnauthorized = rejectUnauthorized;

  return params;
}

function getStream(service, endpoint, options = {}) {
  if (service.useXMLHttpRequest) {
    throw new Error(
      'Cannot use streaming functionality with XMLHttpRequest. Please instantiate without this option to use streaming',
    );
  }

  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: options,
  });

  return StreamableRequest.get(requestOptions);
}

export async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  let data;

  // If not looking for a singular page and still under the max pages limit
  // AND their is a next page, paginate
  if (!queryOptions.page && underMaxPageLimit && links.next) {
    more = await getPaginated(service, links.next.url.replace(service.url, ''), options);
    data = [...response.body, ...more];
  } else {
    data = response.body;
  }

  if (queryOptions.page && showPagination) {
    return {
      data,
      pagination: {
        total: response.headers['x-total'],
        next: response.headers['x-next-page'] || null,
        current: response.headers['x-page'] || null,
        previous: response.headers['x-prev-page'] || null,
        perPage: response.headers['x-per-page'],
        totalPages: response.headers['x-total-pages'],
      },
    };
  }

  return data;
}

class RequestHelper {
  static async handleRequestError(err) {
    if (
      !err.response
      || !err.response.headers
      || !err.response.headers['retry-after']
      || parseInt(err.statusCode, 10) !== 429
    ) throw err;

    const sleepTime = parseInt(err.response.headers['retry-after'], 10);

    if (!sleepTime) throw err;
    return wait(sleepTime * 1000);
  }

  static get(service, endpoint, options = {}, { stream = false } = {}) {
    return RequestHelper.request('get', service, endpoint, options, stream);
  }

  static async request(type, service, endpoint, options = {}, form = false, stream = false) {
    try {
      switch (type) {
        case 'get':
          if (stream) return await getStream(service, endpoint, options);
          return await getPaginated(service, endpoint, options);

        case 'post': {
          const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            [form ? 'formData' : 'body']: options,
          });

          return await service.requester.post(requestOptions);
        }

        case 'put': {
          const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            body: options,
          });

          return await service.requester.put(requestOptions);
        }

        case 'delete': {
          const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            qs: options,
          });

          return await service.requester.delete(requestOptions);
        }

        default:
          throw new Error(`Unknown request type ${type}`);
      }
    } catch (err) {
      await RequestHelper.handleRequestError(err);
      return RequestHelper.request(type, service, endpoint, options, form, stream);
    }
  }

  static post(service, endpoint, options = {}, form = false) {
    return RequestHelper.request('post', service, endpoint, options, form);
  }

  static put(service, endpoint, options = {}) {
    return RequestHelper.request('put', service, endpoint, options);
  }

  static delete(service, endpoint, options = {}) {
    return RequestHelper.request('delete', service, endpoint, options);
  }
}

export default RequestHelper;

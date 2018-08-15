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
    } else {
      params.qs = Humps.decamelizeKeys(qs);
    }
  }

  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

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

async function getPaginated(service, endpoint, options = {}, sleepOnRateLimit = true) {
  const { showPagination, maxPages, ...queryOptions } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    headers: service.headers,
    qs: queryOptions,
    resolveWithFullResponse: true,
  });

  try {
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
  } catch (err) {
     if(
      !err.response ||
      !err.response.headers ||
      !err.response.headers['retry-after'] ||
      parseInt(err.statusCode, 10) != 429
    ) throw err;
    
    const sleepTime = parseInt(err.response.headers['retry-after'], 10);

    if (!sleepTime) throw err;
    
    await wait(sleepTime * 1000);

    return getPaginated(service, endpoint, options);
  }
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

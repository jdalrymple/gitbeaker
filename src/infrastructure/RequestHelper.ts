import Humps from 'humps';
import LinkParser from 'parse-link-header';
import URLJoin from 'url-join';
import Request from 'got';

interface RequestParametersInput {
  url?: string;
  headers: import('./BaseService').default['headers'];
  json?: boolean;
  body?: Object;
  query?: Object;
  rejectUnauthorized?: boolean;
}

interface GetPaginatedOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
}

type RequestParametersOutput = RequestParametersInput &
  Required<Pick<RequestParametersInput, 'url'>>;

function defaultRequest(
  { url, rejectUnauthorized, headers },
  endpoint,
  { body, query, resolveWithFullResponse = false }: RequestParametersInput,
): RequestParametersOutput {
  return [
    URLJoin(url, endpoint),
    {
      headers,
      query: Humps.decamelizeKeys(query),
      body: Humps.decamelizeKeys(body),
      rejectUnauthorized,
      json: true,
    },
  ];
}

async function getPaginated(service, endpoint, options: GetPaginatedOptions = {}) {
  const { showPagination, maxPages, ...queryOptions } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    query: queryOptions,
  });

  const response = await Request.get(...requestOptions);
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
  static async get(service, endpoint, options = {}, { stream = false } = {}) {
    if (stream) {
      return Request.stream(defaultRequest(service, endpoint, {
        query: options,
      });
    }

    const response = await getPaginated(service, endpoint, options);

    return response.body;
  }

  static async post(service, endpoint, options = {}, form = false) {
    const response = await Request.post(defaultRequest(service, endpoint, {
      body: options,
    });

    return response.body;
  }

  static put(service, endpoint, options = {}) {
    const response = await Request.put(defaultRequest(service, endpoint, {
      body: options,
    });

    return response.body;
  }

  static delete(service, endpoint, options = {}) {
    const response = await Request.delete(defaultRequest(service, endpoint, {
      query: options,
    });

    return response.body;
  }
}

export default RequestHelper;

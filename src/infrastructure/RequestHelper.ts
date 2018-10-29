import Request from 'got';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';

interface GetPaginatedOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
}

function defaultRequest(service, endpoint, { body, query }: { body?: Object, query?: Object }) {
  return [
    [service.url, endpoint].join('/'),
    {
      headers: service.headers,
      query: query && stringify(decamelizeKeys(query), { arrayFormat: 'bracket' }),
      body: body && decamelizeKeys(body),
      rejectUnauthorized: service.rejectUnauthorized,
      json: true,
    },
  ];
}

async function getPaginated(service, endpoint, options: GetPaginatedOptions = {}) {
  const { showPagination, maxPages, ...query } = options;
  const requestOptions = defaultRequest(service, endpoint, { query });
  const response = await Request.get(...requestOptions);  
  const pagination = {
    total: response.headers['x-total'],
    next: response.headers['x-next-page'] || null,
    current: response.headers['x-page'] || null,
    previous: response.headers['x-prev-page'] || null,
    perPage: response.headers['x-per-page'],
    totalPages: response.headers['x-total-pages'],
  }

  const underLimit = maxPages ? pagination.current < maxPages : true;
  let data;

  // If not looking for a singular page and still under the max pages limit
  // AND their is a next page, paginate
  if (!query.page && underLimit && pagination.next) {
    const more = await getPaginated(service, endpoint, {
      page: pagination.next,
      ...options
    });

    data = [...response.body, ...more];
  } else {
    data = response.body;
  }

  if (query.page && showPagination) return { data, pagination };

  return data;
}

class RequestHelper {
  static async get(service, endpoint, options = {}, { stream = false } = {}) {
    if (!stream) return getPaginated(service, endpoint, options);

    return Request.stream(
      ...defaultRequest(service, endpoint, {
        query: options,
      }),
    );
  }

  static async post(service, endpoint, options = {}) {
    const response = await Request.post(
      ...defaultRequest(service, endpoint, {
        body: options,
      }),
    );

    return response.body;
  }

  static async put(service, endpoint, options = {}) {
    const response = await Request.put(
      ...defaultRequest(service, endpoint, {
        body: options,
      }),
    );

    return response.body;
  }

  static async delete(service, endpoint, options = {}) {
    const response = await Request.delete(
      ...defaultRequest(service, endpoint, {
        query: options,
      }),
    );

    return response.body;
  }
}

export default RequestHelper;

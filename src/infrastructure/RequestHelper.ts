import Request from 'got';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import { PaginatedRequestOptions, BaseRequestOptions, DefaultRequestOptions } from '@src/types';

function defaultRequest(service, endpoint, { body, query, sudo }: DefaultRequestOptions) {
  return [
    endpoint,
    {
      baseUrl: service.url,
      headers: { sudo, ...service.headers },
      query: query && stringify(decamelizeKeys(query), { arrayFormat: 'bracket' }),
      body: body && decamelizeKeys(body),
      rejectUnauthorized: service.rejectUnauthorized,
      json: true,
    },
  ];
}

async function getPaginated(service, endpoint, options: PaginatedRequestOptions = {}) {
  const { showPagination, maxPages, sudo, ...query } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    query,
    sudo,
  });

  const { headers, body } = await Request.get(...requestOptions);
  const pagination = {
    total: headers['x-total'],
    next: headers['x-next-page'] || null,
    current: headers['x-page'] || null,
    previous: headers['x-prev-page'] || null,
    perPage: headers['x-per-page'],
    totalPages: headers['x-total-pages'],
  };

  const underLimit = maxPages ? pagination.current < maxPages : true;

  // If not looking for a singular page and still under the max pages limit
  // AND their is a next page, paginate
  if (!query.page && underLimit && pagination.next) {
    const more = await getPaginated(service, endpoint, {
      page: pagination.next,
      ...options,
    });

    return [...body, ...more];
  }

  return (showPagination) ?  { data: body, pagination } : body;
}

class RequestHelper {
  static async get(service, endpoint, options: BaseRequestOptions = {}, { stream = false } = {}) {
    const { sudo, ...query } = options;

    if (!stream) return getPaginated(service, endpoint, options);

    return Request.stream(
      ...defaultRequest(service, endpoint, {
        query,
        sudo,
      }),
    );
  }

  static async post(service, endpoint, options: BaseRequestOptions = {}) {
    const { sudo, ...body } = options;
    const response = await Request.post(
      ...defaultRequest(service, endpoint, {
        body,
        sudo,
      }),
    );

    return response.body;
  }

  static async put(service, endpoint, options: BaseRequestOptions = {}) {
    const { sudo, ...body } = options;
    const response = await Request.put(
      ...defaultRequest(service, endpoint, {
        body,
        sudo,
      }),
    );

    return response.body;
  }

  static async delete(service, endpoint, options: BaseRequestOptions = {}) {
    const { sudo, ...query } = options;
    const response = await Request.delete(
      ...defaultRequest(service, endpoint, {
        query,
        sudo,
      }),
    );

    return response.body;
  }
}

export default RequestHelper;

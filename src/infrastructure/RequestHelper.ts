import Request from 'got';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  DefaultRequestOptions,
  PaginationOptions,
  GetResponse,
  PostResponse,
  PutResponse,
  DelResponse
} from '@typings';

function defaultRequest(service, endpoint: string, { body, query, sudo }: DefaultRequestOptions) {
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

export async function get(
  service,
  endpoint: string,
  options: PaginatedRequestOptions = {},
): GetResponse {
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
    const more = await this.get(service, endpoint, {
      page: pagination.next,
      ...options,
    });

    return [...body, ...more];
  }

  return (query.page || maxPages) && showPagination ? { data: body, pagination } : body;
}

export function stream(service, endpoint: string, options: BaseRequestOptions = ({} = {})) {
  return Request.stream(
    ...defaultRequest(service, endpoint, {
      query: options,
    }),
  );
}

export async function post(service, endpoint: string, options: BaseRequestOptions = {}): PostResponse {
  const { sudo, ...body } = options;
  const response = await Request.post(
    ...defaultRequest(service, endpoint, {
      body,
      sudo,
    }),
  );

  return response.body;
}

export async function put(service, endpoint: string, options: BaseRequestOptions = {}): PutResponse {
  const { sudo, ...body } = options;
  const response = await Request.put(
    ...defaultRequest(service, endpoint, {
      body,
    }),
  );

  return response.body;
}

export async function del(service, endpoint: string, options: BaseRequestOptions = {}): DelResponse {
  const { sudo, ...query } = options;
  const response = await Request.delete(
    ...defaultRequest(service, endpoint, {
      query,
    }),
  );

  return response.body;
}

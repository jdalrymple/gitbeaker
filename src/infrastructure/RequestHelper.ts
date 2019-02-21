import FormData from 'form-data';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import { skipAllCaps } from './Utils'
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  DefaultRequestOptions,
  GetResponse,
  PostResponse,
  PutResponse,
  DelResponse,
} from '../../types/types';

function defaultRequest(service, endpoint: string, { body, query, sudo }: DefaultRequestOptions) {
  return [
    endpoint,
    {
      baseUrl: service.url,
      headers: { sudo, ...service.headers },
      query: query && stringify(decamelizeKeys(query), { arrayFormat: 'bracket' }),
      body: body && decamelizeKeys(body, skipAllCaps),
      rejectUnauthorized: service.rejectUnauthorized,
      json: true,
    },
  ];
}

export async function get(
  service,
  endpoint: string,
  options: PaginatedRequestOptions = {},
): Promise<GetResponse> {
  const { showPagination, maxPages, sudo, ...query } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    query,
    sudo,
  });

  const { headers, body } = await service.requester.get(...requestOptions);
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
    const more = await get(service, endpoint, {
      page: pagination.next,
      ...options,
    });

    return [...body, ...more];
  }

  return (query.page || maxPages) && showPagination ? { data: body, pagination } : body;
}

export function stream(service, endpoint: string, options: BaseRequestOptions = ({} = {})) {
  return service.requester.stream(
    ...defaultRequest(service, endpoint, {
      query: options,
    }),
  );
}

export async function post(
  service,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PostResponse> {
  const { sudo, ...body } = options;
  const response = await service.requester.post(
    ...defaultRequest(service, endpoint, {
      body,
      sudo,
    }),
  );

  return response.body;
}

export async function postData(
  service,
  endpoint: string,
  body: FormData,
): Promise<PostResponse> {
  const requestOptions = {
    baseUrl: service.url,
    headers: service.headers,
    body,
    rejectUnauthorized: service.rejectUnauthorized,
  };

  const response = await service.requester.post(endpoint, requestOptions);

  try {
    return JSON.parse(response.body);
  } catch (e) {
    return {};
  }
}

export async function put(
  service,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PutResponse> {
  const { sudo, ...body } = options;
  const response = await service.requester.put(
    ...defaultRequest(service, endpoint, {
      body,
    }),
  );

  return response.body;
}

export async function del(
  service,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<DelResponse> {
  const { sudo, ...query } = options;
  const response = await service.requester.delete(
    ...defaultRequest(service, endpoint, {
      query,
    }),
  );

  return response.body;
}

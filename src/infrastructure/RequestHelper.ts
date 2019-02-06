import FormData from 'form-data';
import { decamelizeKeys, camelizeKeys } from 'humps';
import { stringify } from 'query-string';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  DefaultRequestOptions,
  GetResponse,
  PostResponse,
  PutResponse,
  DelResponse,
  RequesterOptions,
} from '../../types/types';
import { BaseService } from './BaseService';
import { ResponsePromise } from 'ky';
import { skipAllCaps } from './Utils';

function defaultRequest(
  service: BaseService,
  endpoint: string,
  { body, query, sudo }: DefaultRequestOptions,
): [string, RequesterOptions] {
  let urlStr = `${service.url}${endpoint}`;
  if (query) {
    urlStr += `?${stringify(decamelizeKeys(query), { arrayFormat: 'bracket' })}`;
  }
  const headers = {
    ...service.headers,
  };
  if (sudo) {
    headers.sudo = `${sudo}`;
  }
  return [
    urlStr,
    {
      headers,
      body: body && typeof body !== 'object' ? body : undefined,
      // TODO
      // rejectUnauthorized: service.rejectUnauthorized,
      json: typeof body === 'object' ? decamelizeKeys(body, skipAllCaps) : undefined,
    },
  ];
}

async function handleResponse(
  response: ResponsePromise,
): Promise<{
  body: object | [];
  headers: object;
  status: number;
  statusText: string;
}> {
  const { headers, status, statusText } = await response;
  const rawBody = await response.json();
  let body;
  if (Array.isArray(body)) {
    body = rawBody;
  } else if (typeof rawBody === 'object' && rawBody !== null) {
    body = camelizeKeys(rawBody);
  } else {
    body = {};
  }
  return {
    body,
    headers,
    status,
    statusText,
  };
}

async function getImplementation(
  service: BaseService,
  endpoint: string,
  options: PaginatedRequestOptions = {},
  isNextPageRequest: boolean = false,
): Promise<GetResponse> {
  const { showPagination, maxPages, sudo, ...query } = options;
  const requestOptions = defaultRequest(service, endpoint, {
    query,
    sudo,
  });
  const { headers, body } = await handleResponse(
    service.requester.get(...(requestOptions as [string, object])),
  );
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
  if ((isNextPageRequest || !query.page) && underLimit && pagination.next) {
    const more = await getImplementation(
      service,
      endpoint,
      {
        ...options,
        page: pagination.next
      },
      true,
    );

    return [...(Array.isArray(body) ? body : []), ...(Array.isArray(more) ? more : [])];
  }

  return (query.page || underLimit) && showPagination ? { data: body, pagination } : body;
}

export async function get(
  service: BaseService,
  endpoint: string,
  options: PaginatedRequestOptions = {},
): Promise<GetResponse> {
  return getImplementation(service, endpoint, options);
}

export function stream(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = ({} = {}),
) {
  if (typeof service.requester.stream !== 'function') {
    throw new Error('Stream method is not implementated in requester!');
  }

  return service.requester.stream(
    ...defaultRequest(service, endpoint, {
      query: options,
    }),
  );
}

export async function post(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PostResponse> {
  const { sudo, ...body } = options;
  const response = await handleResponse(
    service.requester.post(
      ...defaultRequest(service, endpoint, {
        body,
        sudo,
      }),
    ),
  );

  return response.body;
}

export async function postData(service, endpoint: string, body: FormData): Promise<PostResponse> {
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
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PutResponse> {
  const { sudo, ...body } = options;
  const response = await handleResponse(
    service.requester.put(
      ...defaultRequest(service, endpoint, {
        body,
      }),
    ),
  );

  return response.body;
}

export async function del(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<DelResponse> {
  const { sudo, ...query } = options;
  const response = await handleResponse(
    service.requester.delete(
      ...defaultRequest(service, endpoint, {
        query,
      }),
    ),
  );

  return response.body;
}

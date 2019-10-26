import Li from 'li';
import { camelizeKeys } from 'xcase';
import { BaseService } from './BaseService';

export interface Sudo {
  sudo?: string | number;
}

export interface PaginationOptions {
  total: number;
  next: number | null;
  current: number;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

export interface BaseRequestOptions extends Sudo {
  [key: string]: any;
}

export interface PaginatedRequestOptions extends BaseRequestOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
  perPage?: number;
}

export type PaginationResponse = { data: object[]; pagination: PaginationOptions };
export type GetResponse = PaginationResponse | object | object[];
export type PostResponse = object;
export type PutResponse = object;
export type DelResponse = object;

async function get(
  service: BaseService,
  endpoint: string,
  options: PaginatedRequestOptions = {},
): Promise<GetResponse> {
  const { showPagination, maxPages, sudo, ...query } = options;
  const response = await service.requester.get(service, endpoint, {
    query: query || {},
    sudo,
  });

  const { headers } = response;
  let { body } = response;
  let pagination = {
    total: parseInt(headers['x-total'], 10),
    next: parseInt(headers['x-next-page'], 10) || null,
    current: parseInt(headers['x-page'], 10) || 1,
    previous: parseInt(headers['x-prev-page'], 10) || null,
    perPage: parseInt(headers['x-per-page'], 10),
    totalPages: parseInt(headers['x-total-pages'], 10),
  };

  const underLimit = maxPages ? pagination.current < maxPages : true;

  // Camelize response body if specified
  if (service.camelize) body = camelizeKeys(body);

  // Rescurse through pagination results
  if (!query.page && underLimit && pagination.next) {
    const { next } = Li.parse(headers.link);
    const leaf = service.url.split('/').pop() || '';
    const regex = new RegExp(`.+\/api\/v\\d(\/${leaf})?\/`);
    const more = (await get(service, next.replace(regex, ''), {
      maxPages,
      sudo,
      showPagination: true,
    })) as PaginationResponse;

    pagination = more.pagination;
    body = [...body, ...more.data];
  }

  return (query.page || body.length > 0) && showPagination ? { data: body, pagination } : body;
}

function stream(service: BaseService, endpoint: string, options: BaseRequestOptions = {}) {
  if (typeof service.requester.stream !== 'function') {
    throw new Error('Stream method is not implementated in requester!');
  }

  return service.requester.stream(service, endpoint, {
    query: options,
  });
}

async function post(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PostResponse> {
  const { sudo, form, ...body } = options;

  const response = await service.requester.post(service, endpoint, {
    body: form || body,
    sudo,
  });

  return response.body;
}

async function put(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<PutResponse> {
  const { sudo, ...body } = options;
  const response = await service.requester.put(service, endpoint, {
    body,
  });

  return response.body;
}

async function del(
  service: BaseService,
  endpoint: string,
  options: BaseRequestOptions = {},
): Promise<DelResponse> {
  const { sudo, ...query } = options;
  const response = await service.requester.delete(service, endpoint, {
    query,
    sudo,
  });

  return response.body;
}

export const RequestHelper = {
  post,
  put,
  get,
  del,
  stream,
};

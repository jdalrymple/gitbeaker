import Li from 'li';
import { camelizeKeys } from 'xcase';
import { BaseService } from './BaseService';
import { appendFormFromObject } from './Utils';

export interface Sudo {
  sudo?: string | number;
}

export interface ShowExpanded {
  showExpanded?: boolean;
}

export interface PaginationOptions {
  total: number;
  next: number | null;
  current: number;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

/* eslint @typescript-eslint/no-explicit-any: 0 */
export interface BaseRequestOptions extends Sudo {
  [key: string]: any;
}

export interface PaginatedRequestOptions extends BaseRequestOptions, ShowExpanded {
  maxPages?: number;
  page?: number;
  perPage?: number;
}

export interface ExpandedResponse {
  data: object;
  headers: object;
  status: number;
}

export interface PaginationResponse {
  data: object[];
  pagination: PaginationOptions;
}

export type GetResponse = PaginationResponse | ExpandedResponse | object | object[];
export type PostResponse = ExpandedResponse | object;
export type PutResponse = ExpandedResponse | object;
export type DelResponse = ExpandedResponse | object;

async function get(
  service: BaseService,
  endpoint: string,
  { showExpanded, maxPages, sudo, ...query }: PaginatedRequestOptions = {},
): Promise<GetResponse> {
  const response = await service.requester.get(service, endpoint, {
    query: query || {},
    sudo,
  });

  const { headers, status } = response;
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
    const regex = new RegExp(`.+/api/v\\d(/${leaf})?/`);
    const more = (await get(service, next.replace(regex, ''), {
      maxPages,
      sudo,
      showExpanded: true,
    })) as PaginationResponse;

    pagination = more.pagination;
    body = [...body, ...more.data];
  }

  // If expanded version is not requested, return body
  if (!showExpanded) return body;

  // Else build the expanded response
  const output = { data: body } as Record<string, any>;

  if (body.length > 0 || query.page) {
    output.pagination = pagination;
  } else {
    output.headers = headers;
    output.status = status;
  }

  return output;
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
  { isForm, sudo, showExpanded, ...options }: { isForm?: boolean } & BaseRequestOptions = {},
): Promise<PostResponse> {
  const body = isForm ? appendFormFromObject(options) : options;

  const r = await service.requester.post(service, endpoint, {
    body,
    sudo,
  });

  return showExpanded ? { data: r.body, status: r.status, headers: r.headers } : r.body;
}

async function put(
  service: BaseService,
  endpoint: string,
  { sudo, showExpanded, ...body }: BaseRequestOptions = {},
): Promise<PutResponse> {
  const r = await service.requester.put(service, endpoint, {
    body,
    sudo,
  });

  return showExpanded ? { data: r.body, status: r.status, headers: r.headers } : r.body;
}

async function del(
  service: BaseService,
  endpoint: string,
  { sudo, showExpanded, ...query }: BaseRequestOptions = {},
): Promise<DelResponse> {
  const r = await service.requester.delete(service, endpoint, {
    query,
    sudo,
  });

  return showExpanded ? { data: r.body, status: r.status, headers: r.headers } : r.body;
}

export const RequestHelper = {
  post,
  put,
  get,
  del,
  stream,
};

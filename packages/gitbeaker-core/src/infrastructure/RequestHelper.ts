import { parse as parseLink } from 'li';
import { camelizeKeys } from 'xcase';
import { BaseService } from '@gitbeaker/requester-utils';
import { appendFormFromObject } from './Utils';

export type True = true;
export type False = false;

export interface PaginationInformation {
  total: number;
  next: number | null;
  current: number;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

// Options
export interface Sudo {
  sudo?: string | number;
}
export interface IsForm {
  isForm?: boolean;
}
export interface ShowExpanded {
  showExpanded?: boolean;
}

/* eslint @typescript-eslint/no-explicit-any:0 */
export type BaseRequestOptions = Sudo & Record<string, any>;
export interface PaginatedRequestOptions extends BaseRequestOptions, ShowExpanded {
  maxPages?: number;
  page?: number;
  perPage?: number;
}

// Response Formats
export interface ExpandedResponse<T> {
  data: T;
  headers: Record<string, unknown>;
  status: number;
}
export interface PaginationResponse<T = Record<string, unknown>[]> {
  data: T;
  pagination: PaginationInformation;
}

export async function get<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  options?: BaseRequestOptions,
): Promise<T | T[]>;
export async function get<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  options?: PaginatedRequestOptions & { showExpanded: true },
): Promise<ExpandedResponse<T> | ExpandedResponse<T[]> | PaginationResponse<T[]>>;

/* eslint @typescript-eslint/no-explicit-any:0 */
export async function get<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  { showExpanded, maxPages, sudo, ...query }: PaginatedRequestOptions = {},
): Promise<any> {
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
  if (Array.isArray(body) && !query.page && underLimit && pagination.next) {
    const { next } = parseLink(headers.link);
    const leaf = '';
    const regex = new RegExp(`.+/api/v\\d(/${leaf})?/`);
    const more = (await get(service, next.replace(regex, ''), {
      maxPages,
      sudo,
      showExpanded: true,
    })) as PaginationResponse<T[]>;

    pagination = more.pagination;
    body = [...body, ...more.data];
  }

  // If expanded version is not requested, return body
  if (!showExpanded) return body;

  // Else build the expanded response
  const output: {
    data: T | T[];
    pagination?: PaginationInformation;
    headers?: Record<string, string>;
    status?: number;
  } = {
    data: body as T | T[],
  };

  if ((Array.isArray(body) && body.length > 0) || query.page) {
    output.pagination = pagination;
  } else {
    output.headers = headers;
    output.status = status;
  }

  return output as ExpandedResponse<T> | ExpandedResponse<T[]> | PaginationResponse<T[]>;
}

async function post<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  options?: IsForm & BaseRequestOptions,
): Promise<T>;
async function post<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  options?: IsForm & BaseRequestOptions & { showExpanded: true },
): Promise<ExpandedResponse<T>>;

/* eslint @typescript-eslint/no-explicit-any:0 */
async function post(
  service: BaseService,
  endpoint: string,
  { isForm, sudo, showExpanded, ...options }: IsForm & ShowExpanded & BaseRequestOptions = {},
): Promise<any> {
  const body = isForm ? appendFormFromObject(options) : options;

  const r = await service.requester.post(service, endpoint, {
    body,
    sudo,
  });

  return showExpanded
    ? {
        data: r.body,
        status: r.status,
        headers: r.headers,
      }
    : r.body;
}

async function put<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  options?: BaseRequestOptions,
): Promise<T>;
async function put<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  { showExpanded }: BaseRequestOptions & { showExpanded: true },
): Promise<ExpandedResponse<T>>;

/* eslint @typescript-eslint/no-explicit-any:0 */
async function put(
  service: BaseService,
  endpoint: string,
  { sudo, showExpanded, ...body }: ShowExpanded & BaseRequestOptions = {},
): Promise<any> {
  const r = await service.requester.put(service, endpoint, {
    body,
    sudo,
  });

  return showExpanded ? { data: r.body, status: r.status, headers: r.headers } : r.body;
}

async function del<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  options?: BaseRequestOptions,
): Promise<T>;
async function del<T = Record<string, unknown>>(
  service: BaseService,
  endpoint: string,
  { showExpanded }: BaseRequestOptions & { showExpanded: true },
): Promise<ExpandedResponse<T>>;

/* eslint @typescript-eslint/no-explicit-any:0 */
async function del(
  service: BaseService,
  endpoint: string,
  { sudo, showExpanded, ...query }: ShowExpanded & BaseRequestOptions = {},
): Promise<any> {
  const r = await service.requester.delete(service, endpoint, {
    query,
    sudo,
  });

  return showExpanded ? { data: r.body, status: r.status, headers: r.headers } : r.body;
}

function stream(
  service: BaseService,
  endpoint: string,
  options?: BaseRequestOptions,
): NodeJS.ReadableStream {
  if (typeof service.requester.stream !== 'function') {
    throw new Error('Stream method is not implementated in requester!');
  }

  return service.requester.stream(service, endpoint, {
    query: options,
  });
}

export const RequestHelper = {
  post,
  put,
  get,
  del,
  stream,
};

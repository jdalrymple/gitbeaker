import { parse as parseQueryString } from 'qs';
import { camelizeKeys } from 'xcase';
import { BaseResource } from '@gitbeaker/requester-utils';
import type {
  FormattedResponse,
  RequestHandlerFn,
  RequesterBodyType,
  ResponseBodyTypes,
} from '@gitbeaker/requester-utils';
import { appendFormFromObject, parseLinkHeader } from './Utils';
import type { AllOrNone, Camelize } from './Utils';

export interface IsForm {
  isForm?: boolean;
}

export interface Sudo {
  sudo?: string | number;
}

export interface AsStream {
  asStream?: boolean;
}

export interface ShowExpanded<E extends boolean = false> {
  showExpanded?: E;
}

export interface AsAdmin<A extends boolean = false> {
  asAdmin?: A;
}

export type BaseRequestOptions<E extends boolean = false> = Sudo &
  ShowExpanded<E> & { [Key in string]?: any };

export type PaginationTypes = 'keyset' | 'offset';

export interface KeysetPaginationRequestOptions {
  orderBy: string;
  sort: 'asc' | 'desc';
}

export interface OffsetPaginationRequestOptions {
  page?: number | string;
  maxPages?: number;
}

export interface BasePaginationRequestOptions<P extends PaginationTypes | void> {
  pagination?: P;
  perPage?: number | string;
}

export type PaginationRequestSubOptions<P extends PaginationTypes | void> = P extends 'keyset'
  ? AllOrNone<KeysetPaginationRequestOptions>
  : P extends 'offset'
    ? OffsetPaginationRequestOptions
    : AllOrNone<KeysetPaginationRequestOptions> & OffsetPaginationRequestOptions;

export type PaginationRequestOptions<P extends PaginationTypes | void = void> =
  BasePaginationRequestOptions<P> & PaginationRequestSubOptions<P>;

// Response Formats
export type CamelizedResponse<T, C> = C extends true ? Camelize<T> : T;

export interface OffsetPagination {
  total: number;
  next: number | null;
  current: number;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

export interface KeysetPagination {
  idAfter: number;
  perPage: number;
  orderBy: string;
  sort: 'asc' | 'desc';
}

export interface ExpandedResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

export type PaginatedResponse<T, P extends PaginationTypes = PaginationTypes> = {
  [U in P]: {
    paginationInfo: P extends 'keyset' ? KeysetPagination : OffsetPagination;
    data: T;
  };
}[P];

export type GitlabAPIExpandedResponse<T, E extends boolean | void, P> = E extends true
  ? P extends PaginationTypes
    ? PaginatedResponse<T, P>
    : ExpandedResponse<T>
  : T;

export type GitlabAPISingleResponse<T, C extends boolean | void, E extends boolean | void> =
  T extends Record<string, unknown>
    ? GitlabAPIExpandedResponse<CamelizedResponse<T, C>, E, undefined>
    : GitlabAPIExpandedResponse<T, E, undefined>;

export type GitlabAPIMultiResponse<
  T,
  C extends boolean | void,
  E extends boolean | void,
  P extends PaginationTypes | void,
> =
  T extends Record<string, unknown>
    ? GitlabAPIExpandedResponse<CamelizedResponse<T, C>[], E, P>
    : GitlabAPIExpandedResponse<T[], E, P>;

export type GitlabAPIResponse<
  T,
  C extends boolean | void,
  E extends boolean | void,
  P extends PaginationTypes | void,
> = T extends (infer R)[] ? GitlabAPIMultiResponse<R, C, E, P> : GitlabAPISingleResponse<T, C, E>;

function packageResponse<T extends ResponseBodyTypes, E extends boolean>(
  response: FormattedResponse<T>,
  showExpanded?: E,
): E extends true ? ExpandedResponse<T> : T;
function packageResponse<T extends ResponseBodyTypes>(
  response: FormattedResponse<T>,
  showExpanded?: boolean,
): T | ExpandedResponse<T> {
  return showExpanded
    ? {
        data: response.body,
        status: response.status,
        headers: response.headers,
      }
    : response.body;
}

function getStream<E extends boolean>(
  response: FormattedResponse<ReadableStream>,
  showExpanded?: E,
) {
  return packageResponse(response, showExpanded);
}

function getSingle<E extends boolean>(
  camelize: boolean,
  response: FormattedResponse<Record<string, unknown>>,
  showExpanded?: E,
) {
  const { status, headers } = response;
  let { body } = response;

  // Camelize response body if specified
  if (camelize) body = camelizeKeys(body);

  return packageResponse({ body, status, headers }, showExpanded);
}

function getManyMore<
  T extends Record<string, unknown>[],
  E extends boolean,
  P extends PaginationTypes = PaginationTypes,
>(
  camelize: boolean,
  getFn: RequestHandlerFn<T>,
  endpoint: string,
  response: FormattedResponse<T>,
  requestOptions: { maxPages?: number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  acc?: T,
): Promise<E extends true ? PaginatedResponse<T, P> : T>;

async function getManyMore<
  T extends Record<string, unknown>[],
  E extends boolean,
  P extends PaginationTypes = PaginationTypes,
>(
  camelize: boolean,
  getFn: RequestHandlerFn<T>,
  endpoint: string,
  response: FormattedResponse<T>,
  requestOptions: { maxPages?: number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  acc?: T,
): Promise<PaginatedResponse<T, P> | T> {
  const { sudo, showExpanded, maxPages, pagination, page, perPage, idAfter, orderBy, sort } =
    requestOptions;

  // Camelize response body if specified
  if (camelize) response.body = camelizeKeys(response?.body);

  const newAcc = [...(acc || []), ...response.body] as T;
  const withinBounds = maxPages && perPage ? newAcc.length / +perPage < maxPages : true;

  // Recurse through pagination results
  const { next = '' } = parseLinkHeader(response.headers.link);

  if (!(page && (acc || []).length === 0) && next && withinBounds) {
    const parsedQueryString = parseQueryString(next.split('?')[1]);
    const qs = { ...camelizeKeys(parsedQueryString) };
    const newOpts = {
      ...qs,
      maxPages,
      sudo,
      showExpanded,
    } as unknown as { maxPages?: number } & PaginationRequestOptions<P> & BaseRequestOptions<E>;

    const nextResponse: FormattedResponse<T> = await getFn(endpoint, {
      searchParams: qs,
      sudo,
    });

    return getManyMore(camelize, getFn, endpoint, nextResponse, newOpts, newAcc);
  }

  if (!showExpanded) return newAcc;

  const paginationInfo =
    pagination === 'keyset'
      ? {
          idAfter: idAfter ? +idAfter : null,
          perPage: perPage ? +perPage : null,
          orderBy: orderBy as string,
          sort: sort as 'asc' | 'dec',
        }
      : {
          total: parseInt(response.headers['x-total'], 10),
          next: parseInt(response.headers['x-next-page'], 10) || null,
          current: parseInt(response.headers['x-page'], 10) || 1,
          previous: parseInt(response.headers['x-prev-page'], 10) || null,
          perPage: parseInt(response.headers['x-per-page'], 10),
          totalPages: parseInt(response.headers['x-total-pages'], 10),
        };

  return {
    data: newAcc,
    paginationInfo,
  } as PaginatedResponse<T, P>;
}

type getOverloadImproved<T extends ResponseBodyTypes> = {
  <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options: BaseRequestOptions<E> & { asStream: true },
  ): Promise<GitlabAPIResponse<ReadableStream, C, E, void>>;
  <
    C extends boolean = false,
    E extends boolean = false,
    P extends 'keyset' | 'offset' | void = void,
  >(
    service: BaseResource<C>,
    endpoint: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<T, C, E, P>>;
  <
    C extends boolean = false,
    E extends boolean = false,
    P extends 'keyset' | 'offset' | void = void,
  >(
    service: BaseResource<C>,
    endpoint: string,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<T, C, E, P>>;
  <
    C extends boolean = false,
    E extends boolean = false,
    P extends 'keyset' | 'offset' | void = void,
  >(
    service: BaseResource<C>,
    endpoint: string,
    options?: AsStream & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<T, C, E, P>>;
};

export function get<
  T extends ResponseBodyTypes = Record<string, unknown>,
>(): getOverloadImproved<T> {
  return async <C extends boolean, E extends boolean>(
    service: BaseResource<C>,
    endpoint: string,
    options?: BaseRequestOptions<E>,
  ): Promise<any> => {
    const { asStream, sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const signal = service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined;

    const response = await service.requester.get(endpoint, {
      searchParams,
      sudo,
      asStream,
      signal,
    });

    const camelizeResponseBody = service.camelize || false;

    // Handle streaming, single and paginated responses
    if (asStream) return getStream(response as FormattedResponse<ReadableStream>, showExpanded);
    if (!Array.isArray(response.body))
      return getSingle(
        camelizeResponseBody,
        response as FormattedResponse<Record<string, unknown>>,
        showExpanded,
      );

    const reqOpts = {
      sudo,
      showExpanded,
      maxPages,
      ...searchParams,
    };

    return getManyMore(
      camelizeResponseBody,
      (ep, op) => service.requester.get(ep, { ...op, signal }),
      endpoint,
      response as FormattedResponse<Record<string, unknown>[]>,
      reqOpts,
    );
  };
}

export function post<T extends ResponseBodyTypes>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    { searchParams, sudo, showExpanded, rawBody, ...options }: IsForm & BaseRequestOptions<E> = {},
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    let body: RequesterBodyType | undefined;

    if (rawBody) body = rawBody;
    else body = options;

    const response = await service.requester.post(endpoint, {
      searchParams,
      body,
      sudo,
      signal: service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined,
    });

    // Camelize response body if specified
    if (service.camelize) response.body = camelizeKeys(response.body);

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export function put<T extends ResponseBodyTypes>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    { searchParams, sudo, showExpanded, rawBody, ...options }: IsForm & BaseRequestOptions<E> = {},
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    let body: RequesterBodyType | undefined;

    if (rawBody) body = rawBody;
    else body = options;

    const response = await service.requester.put(endpoint, {
      body,
      searchParams,
      sudo,
      signal: service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined,
    });

    // Camelize response body if specified
    if (service.camelize) response.body = camelizeKeys(response.body);

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export function patch<T extends ResponseBodyTypes>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    {
      searchParams,
      sudo,
      showExpanded,
      rawBody,
      isForm,
      ...options
    }: IsForm & BaseRequestOptions<E> = {},
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    let body: RequesterBodyType | undefined;

    if (rawBody) body = rawBody;
    else if (isForm) body = appendFormFromObject(options as Record<string, ResponseBodyTypes>);
    else body = options;

    const response = await service.requester.patch(endpoint, {
      body,
      searchParams,
      sudo,
      signal: service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined,
    });

    // Camelize response body if specified
    if (service.camelize) response.body = camelizeKeys(response.body);

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export function del<T extends ResponseBodyTypes = void>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    { sudo, showExpanded, searchParams, ...options }: BaseRequestOptions<E> = {},
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    const response = await service.requester.delete(endpoint, {
      body: options,
      searchParams,
      sudo,
      signal: service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined,
    });

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export const RequestHelper = {
  post,
  put,
  patch,
  get,
  del,
};

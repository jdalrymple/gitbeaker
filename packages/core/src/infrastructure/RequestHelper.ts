import type {
  DefaultRequesterOptions,
  FormattedResponse,
  RequesterBodyType,
  RequesterSearchParams,
  ResponseType,
} from '@gitbeaker/requester-utils';

import { BaseResource } from '@gitbeaker/requester-utils';
import { parse as parseQueryString } from 'picoquery';
import { camelizeKeys } from 'xcase';

import type { Camelize } from './Utils';

import { parseLinkHeader } from './Utils';

export interface AsStream {
  asStream?: boolean;
}

export interface Sudo {
  sudo?: string | number;
}

export interface ShowExpanded<E extends boolean = false> {
  showExpanded?: E;
}

export type BaseRequestBodyRecordOptions = Record<string, unknown>;

export type BaseRequestSearchParams = RequesterSearchParams;

export type PaginationTypes = 'keyset' | 'offset';

export interface PaginationType<P extends PaginationTypes = 'offset'> {
  pagination?: P;
}

export interface KeysetPaginationRequestParams {
  pagination: 'keyset';
  perPage?: number | string;
  orderBy: string;
  sort: 'asc' | 'desc';
  idAfter?: number | string;
  cursor?: string;
}

export interface OffsetPaginationRequestParams {
  page?: number | string;
  perPage?: number | string;
}

export interface BasePaginationRequestOptions {
  maxPages?: number;
}

export type PaginationRequestSearchParams<P extends PaginationTypes> = P extends 'keyset'
  ? KeysetPaginationRequestParams
  : OffsetPaginationRequestParams;

export type PaginationRequestOptions<P extends PaginationTypes> = BasePaginationRequestOptions &
  PaginationRequestSearchParams<P> &
  PaginationType<P>;

// Internal types
type RequestHelperSearchParamOptions = {
  searchParams?: RequesterSearchParams;
};

type RequestHelperBodyOptions = {
  body?: RequesterBodyType;
};

// Response Formats
export type CamelizedResponse<T, C> = C extends true ? Camelize<T> : T;

export interface ExpandedResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

export interface OffsetPaginationResponseParams {
  total: number;
  next: number | null;
  current: number;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

export interface KeysetPaginationResponseParams {
  idAfter?: number;
  cursor?: string;
  perPage: number;
  orderBy: string;
  sort: 'asc' | 'desc';
}

export type PaginatedResponse<T, P extends PaginationTypes = PaginationTypes> = {
  [U in P]: {
    paginationInfo: P extends 'keyset'
      ? KeysetPaginationResponseParams
      : OffsetPaginationResponseParams;
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

function packageResponse<T extends ResponseType, E extends boolean>(
  response: FormattedResponse<T>,
  showExpanded?: E,
): E extends true ? ExpandedResponse<T> : T;

function packageResponse<T extends ResponseType>(
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
  response: FormattedResponse<ResponseType>,
  showExpanded?: E,
) {
  const { status, headers } = response;
  let { body } = response;

  if (camelize) body = camelizeKeys(body);

  return packageResponse({ body, status, headers }, showExpanded);
}

// Overload used to simplify return types based on conditional
function getMany<T extends Record<string, unknown>[], E extends boolean, P extends PaginationTypes>(
  camelize: boolean,
  getFn: (ep: string, op: DefaultRequesterOptions) => Promise<FormattedResponse<T>>,
  endpoint: string,
  response: FormattedResponse<T>,
  requestOptions: {
    searchParams: PaginationRequestSearchParams<P> & PaginationType<P>;
  } & BasePaginationRequestOptions &
    ShowExpanded<E> &
    Sudo,
  acc?: T,
): Promise<E extends true ? PaginatedResponse<T, P> : T>;

async function getMany<
  T extends Record<string, unknown>[],
  E extends boolean,
  P extends PaginationTypes,
>(
  camelize: boolean,
  getFn: (ep: string, op: DefaultRequesterOptions) => Promise<FormattedResponse<T>>,
  endpoint: string,
  response: FormattedResponse<T>,
  requestOptions: {
    searchParams: PaginationRequestSearchParams<P> & PaginationType<P>;
  } & BasePaginationRequestOptions &
    ShowExpanded<E> &
    Sudo,
  acc?: T,
): Promise<PaginatedResponse<T, P> | T> {
  const { sudo, showExpanded, maxPages, searchParams } = requestOptions || {};

  if (camelize) response.body = camelizeKeys(response?.body);

  // Build the new list of results
  const newAcc = [...(acc || []), ...response.body] as T;

  // Determine if we should continue pagination
  const { next: nextResultsUrl = '' } = parseLinkHeader(response.headers.link);

  const withinBounds =
    maxPages && searchParams?.perPage ? newAcc.length / +searchParams?.perPage < maxPages : true;

  const isLookingForASpecificPage =
    searchParams &&
    searchParams?.pagination !== 'keyset' &&
    'page' in searchParams &&
    (acc || []).length === 0;

  const skipPagination = !nextResultsUrl || !withinBounds || isLookingForASpecificPage;

  if (!skipPagination) {
    const parsedQueryString = parseQueryString(nextResultsUrl.split('?')[1], {
      nesting: true,
      nestingSyntax: 'index',
      arrayRepeat: true,
      arrayRepeatSyntax: 'bracket',
    });
    const qs: PaginationRequestSearchParams<P> = { ...camelizeKeys(parsedQueryString) };
    const newOpts = {
      maxPages,
      sudo,
      showExpanded,
      searchParams: {
        ...qs,
        ...(searchParams?.pagination && { pagination: searchParams.pagination }),
      } as PaginationRequestSearchParams<P> & PaginationType<P>,
    };

    const nextResponse: FormattedResponse<T> = await getFn(endpoint, {
      searchParams: qs as RequesterSearchParams,
      sudo,
    });

    return getMany(camelize, getFn, endpoint, nextResponse, newOpts, newAcc);
  }

  if (!showExpanded) return newAcc;

  // Parse out pagination information
  let paginationInfo;

  if (searchParams?.pagination === ('keyset' as const)) {
    const keysetParams = searchParams as KeysetPaginationRequestParams;

    const orderBy = keysetParams?.orderBy;
    const sort = keysetParams?.sort;
    const idAfter = keysetParams?.idAfter;
    const cursor = keysetParams?.cursor;
    const perPage = searchParams?.perPage;

    paginationInfo = {
      idAfter: idAfter ? +idAfter : null,
      cursor: cursor || null,
      perPage: perPage ? +perPage : null,
      orderBy: orderBy,
      sort: sort,
    };
  } else {
    paginationInfo = {
      total: parseInt(response.headers['x-total'], 10),
      next: parseInt(response.headers['x-next-page'], 10) || null,
      current: parseInt(response.headers['x-page'], 10) || 1,
      previous: parseInt(response.headers['x-prev-page'], 10) || null,
      perPage: parseInt(response.headers['x-per-page'], 10),
      totalPages: parseInt(response.headers['x-total-pages'], 10),
    };
  }

  return {
    data: newAcc,
    paginationInfo,
  } as PaginatedResponse<T, P>;
}

type getOverload<T extends ResponseType> = {
  // Streamed response
  <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options: { asStream: true } & RequestHelperSearchParamOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReadableStream, C, E, void>>;

  //Many Get
  <C extends boolean = false, E extends boolean = false, P extends 'keyset' | 'offset' = 'offset'>(
    service: BaseResource<C>,
    endpoint: string,
    options?: {
      searchParams: BaseRequestSearchParams &
        (PaginationRequestSearchParams<P> & PaginationType<P>);
    } & BasePaginationRequestOptions &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, P>>;

  <C extends boolean = false, E extends boolean = false, P extends 'keyset' | 'offset' = 'offset'>(
    service: BaseResource<C>,
    endpoint: string,
    options?: {
      searchParams: PaginationRequestSearchParams<P> & PaginationType<P>;
    } & BasePaginationRequestOptions &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, P>>;

  //Single Get
  <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options?: AsStream & RequestHelperSearchParamOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, void>>;
};

export function get<T extends ResponseType = Record<string, unknown>>(): getOverload<T> {
  return async <C extends boolean, E extends boolean, P extends 'keyset' | 'offset'>(
    service: BaseResource<C>,
    endpoint: string,
    options?: (
      | ({
          searchParams: PaginationRequestSearchParams<P> & PaginationType<P>;
        } & BasePaginationRequestOptions)
      | RequestHelperSearchParamOptions
    ) &
      AsStream &
      ShowExpanded<E> &
      Sudo,
  ): Promise<any> => {
    const { asStream, sudo, showExpanded, searchParams } = options || {};
    const signal = service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined;

    const response = await service.requester.get(endpoint, {
      ...(searchParams && { searchParams: searchParams as RequesterSearchParams }),
      ...(sudo && { sudo }),
      ...(signal && { signal }),
    });

    const camelizeResponseBody = service.camelize || false;

    // Handle streaming, single and paginated responses
    if (asStream) return getStream(response as FormattedResponse<ReadableStream>, showExpanded);

    if (!Array.isArray(response.body))
      return getSingle(camelizeResponseBody, response, showExpanded);

    return getMany(
      camelizeResponseBody,
      (ep, op) => service.requester.get(ep, { ...op, signal }),
      endpoint,
      response as FormattedResponse<Record<string, unknown>[]>,
      options as {
        searchParams: PaginationRequestSearchParams<P> & PaginationType<P>;
      } & BasePaginationRequestOptions &
        ShowExpanded<E> &
        Sudo,
    );
  };
}

export function post<T extends ResponseType>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options?: RequestHelperBodyOptions & RequestHelperSearchParamOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    const { body, searchParams, sudo, showExpanded } = options || {};
    const signal = service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined;

    const response = await service.requester.post(endpoint, {
      ...(body && { body }),
      ...(searchParams && { searchParams }),
      ...(sudo && { sudo }),
      ...(signal && { signal }),
    });

    // Camelize response body if specified
    if (service.camelize) response.body = camelizeKeys(response.body);

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export function put<T extends ResponseType>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options?: RequestHelperBodyOptions & RequestHelperSearchParamOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    const { body, searchParams, sudo, showExpanded } = options || {};
    const signal = service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined;

    const response = await service.requester.put(endpoint, {
      ...(body && { body }),
      ...(searchParams && { searchParams }),
      ...(sudo && { sudo }),
      ...(signal && { signal }),
    });

    // Camelize response body if specified
    if (service.camelize) response.body = camelizeKeys(response.body);

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export function patch<T extends ResponseType>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options?: RequestHelperBodyOptions & RequestHelperSearchParamOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    const { body, searchParams, sudo, showExpanded } = options || {};
    const signal = service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined;

    const response = await service.requester.patch(endpoint, {
      ...(body && { body }),
      ...(searchParams && { searchParams }),
      ...(sudo && { sudo }),
      ...(signal && { signal }),
    });

    // Camelize response body if specified
    if (service.camelize) response.body = camelizeKeys(response.body);

    return packageResponse(response, showExpanded) as GitlabAPIResponse<T, C, E, void>;
  };
}

export function del<T extends ResponseType = void>() {
  return async <C extends boolean = false, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options?: RequestHelperBodyOptions & RequestHelperSearchParamOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<T, C, E, void>> => {
    const { body, searchParams, sudo, showExpanded } = options || {};
    const signal = service.queryTimeout ? AbortSignal.timeout(service.queryTimeout) : undefined;

    const response = await service.requester.delete(endpoint, {
      ...(body && { body }),
      ...(searchParams && { searchParams }),
      ...(sudo && { sudo }),
      ...(signal && { signal }),
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

import { parse as parseLink } from 'li';
import { parseUrl as parseQueryString } from 'query-string';
import { camelizeKeys } from 'xcase';
import { BaseResource } from '@gitbeaker/requester-utils';
import { appendFormFromObject, Camelize } from './Utils';

// Request Options
export type IsForm = {
  isForm?: boolean;
};

export type Sudo = {
  sudo?: string | number;
};

export type ShowExpanded<T extends boolean = boolean> = {
  showExpanded?: T;
};

export type BaseRequestOptions = Sudo & Record<string, unknown>;

export type BasePaginationRequestOptions<P extends 'keyset' | 'offset' = 'keyset' | 'offset'> =
  BaseRequestOptions & {
    pagination?: P;
    perPage?: number;
  };

export type OffsetPaginationRequestOptions = {
  page?: number;
  maxPages?: number;
};

export type PaginatedRequestOptions<P extends 'keyset' | 'offset' = 'keyset' | 'offset'> =
  P extends 'keyset'
    ? BasePaginationRequestOptions<P>
    : BasePaginationRequestOptions<P> & OffsetPaginationRequestOptions;

// Response Formats
export interface ExpandedResponse<T = Record<string, unknown>> {
  data: T;
  headers: Record<string, unknown>;
  status: number;
}
export interface PaginationResponse<T = Record<string, unknown>[]> {
  data: T;
  paginationInfo: {
    next: number | null;
    current: number;
    previous: number | null;
    perPage: number;
  };
}

export type CamelizedRecord<C, T> = C extends true ? Camelize<T> : T;

export type ExtendedRecordReturn<
  C extends boolean,
  E extends boolean,
  T extends Record<string, unknown> | void,
> = T extends void
  ? void
  : E extends false
  ? CamelizedRecord<C, T>
  : ExpandedResponse<CamelizedRecord<C, T>>;

export type ExtendedArrayReturn<
  C extends boolean,
  E extends boolean,
  T,
  P extends 'keyset' | 'offset',
> = E extends false
  ? CamelizedRecord<C, T>[]
  : P extends 'keyset'
  ? CamelizedRecord<C, T>[]
  : PaginationResponse<CamelizedRecord<C, T>[]>;

export type ExtendedReturn<
  C extends boolean,
  E extends boolean,
  P extends 'keyset' | 'offset',
  T extends Record<string, unknown> | Record<string, unknown>[],
> = T extends Record<string, unknown>
  ? ExtendedRecordReturn<C, E, T>
  : T extends (infer R)[]
  ? ExtendedArrayReturn<C, E, R, P>
  : never;

async function getHelper<P extends 'keyset' | 'offset', E extends boolean>(
  service: BaseResource<boolean>,
  endpoint: string,
  {
    sudo,
    showExpanded,
    maxPages,
    ...query
  }: BasePaginationRequestOptions<P> & ShowExpanded<E> & { maxPages?: number } = {},
  acc: Record<string, unknown>[] = [],
): Promise<any> {
  const response = await service.requester.get(endpoint, { query, sudo });
  const { headers, status } = response;
  let { body } = response;

  // Camelize response body if specified
  if (service.camelize) body = camelizeKeys(body);

  // Handle object responses
  if (!Array.isArray(body)) {
    if (!showExpanded) return body;

    return {
      data: body,
      headers,
      status,
    };
  }

  // Handle array responses
  const newAcc = [...acc, ...body];
  const { next }: { next: string } = parseLink(headers.link);
  const { query: qs = {} } = next ? parseQueryString(next, { parseNumbers: true }) : {};
  const withinBounds = maxPages
    ? newAcc.length / ((qs.per_page as unknown as number) || 20) < maxPages
    : true;

  // Recurse through pagination results
  if (!(query.page && acc.length === 0) && next && withinBounds) {
    return getHelper(
      service,
      endpoint,
      {
        ...qs,
        maxPages,
        sudo,
      },
      newAcc,
    );
  }

  if (!showExpanded || query.pagination === 'keyset') return newAcc;

  return {
    data: newAcc,
    paginationInfo: {
      next: parseInt(headers['x-next-page'], 10) || null,
      current: parseInt(headers['x-page'], 10) || 1,
      previous: parseInt(headers['x-prev-page'], 10) || null,
      perPage: parseInt(headers['x-per-page'], 10),
    },
  };
}

export function get<
  T extends Record<string, unknown> | Record<string, unknown>[] = Record<string, unknown>,
>() {
  return <C extends boolean, P extends 'keyset' | 'offset' = 'offset', E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    options?: PaginatedRequestOptions<P> & ShowExpanded<E> & Record<string, any>,
  ): Promise<ExtendedReturn<C, E, P, T>> => getHelper(service, endpoint, options);
}

export function post<T extends Record<string, unknown> | void = Record<string, unknown>>() {
  return async <C extends boolean, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    {
      query,
      isForm,
      sudo,
      showExpanded,
      ...options
    }: IsForm & BaseRequestOptions & ShowExpanded<E> = {},
  ): Promise<ExtendedRecordReturn<C, E, T>> => {
    const body = isForm ? appendFormFromObject(options) : options;

    const r = await service.requester.post(endpoint, {
      query,
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
  };
}

export function put<T extends Record<string, unknown> = Record<string, unknown>>() {
  return async <C extends boolean, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    {
      query,
      isForm,
      sudo,
      showExpanded,
      ...options
    }: IsForm & BaseRequestOptions & ShowExpanded<E> = {},
  ): Promise<ExtendedRecordReturn<C, E, T>> => {
    const body = isForm ? appendFormFromObject(options) : options;

    const r = await service.requester.put(endpoint, {
      body,
      query,
      sudo,
    });

    return showExpanded
      ? {
          data: r.body,
          status: r.status,
          headers: r.headers,
        }
      : r.body;
  };
}

export function del<T extends Record<string, unknown> | void = void>() {
  return async <C extends boolean, E extends boolean = false>(
    service: BaseResource<C>,
    endpoint: string,
    { sudo, showExpanded, ...query }: BaseRequestOptions & ShowExpanded<E> = {},
  ): Promise<ExtendedRecordReturn<C, E, T>> => {
    const r = await service.requester.delete(endpoint, {
      query,
      sudo,
    });

    return showExpanded
      ? {
          data: r.body,
          status: r.status,
          headers: r.headers,
        }
      : r.body;
  };
}

function stream<C extends boolean>(
  service: BaseResource<C>,
  endpoint: string,
  options?: BaseRequestOptions,
): NodeJS.ReadableStream {
  if (typeof service.requester.stream !== 'function') {
    throw new Error('Stream method is not implementated in requester!');
  }

  return service.requester.stream(endpoint, {
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

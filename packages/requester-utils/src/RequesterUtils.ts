import { decamelizeKeys } from 'xcase';
import FormData from 'form-data';
import { stringify } from 'query-string';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Types
export interface Constructable<T = any> {
  new (...args: any[]): T;
}

export interface RequesterType {
  get(endpoint: string, options?: Record<string, unknown>): Promise<any>;
  post(endpoint: string, options?: Record<string, unknown>): Promise<any>;
  put(endpoint: string, options?: Record<string, unknown>): Promise<any>;
  delete(endpoint: string, options?: Record<string, unknown>): Promise<any>;
  stream?(endpoint: string, options?: Record<string, unknown>): NodeJS.ReadableStream;
}

export type DefaultServiceOptions = {
  headers: { [header: string]: string };
  requestTimeout: number;
  url: string;
  rejectUnauthorized: boolean;
};

export type DefaultRequestOptions = {
  body?: FormData | Record<string, unknown>;
  query?: Record<string, unknown>;
  sudo?: string;
  method?: string;
};

export type DefaultRequestReturn = {
  headers: Record<string, string> | Headers;
  timeout?: number;
  method: string;
  searchParams?: string;
  prefixUrl?: string;
  body?: string | FormData;
};

// Utility methods
export function formatQuery(params: Record<string, unknown> = {}): string {
  const decamelized = decamelizeKeys(params);

  if (decamelized.not) decamelized.not = JSON.stringify(decamelized.not);

  return stringify(decamelized, { arrayFormat: 'bracket' });
}

export type OptionsHandlerFn = (
  serviceOptions: DefaultServiceOptions,
  requestOptions: DefaultRequestOptions,
) => DefaultRequestReturn;
export function defaultOptionsHandler(
  serviceOptions: DefaultServiceOptions,
  { body, query, sudo, method = 'get' }: DefaultRequestOptions = {},
): DefaultRequestReturn {
  const { headers, requestTimeout, url } = serviceOptions;
  let bod: FormData | string;

  if (sudo) headers.sudo = sudo;

  // FIXME: Not the best comparison, but...it will have to do for now.
  if (typeof body === 'object' && body.constructor.name !== 'FormData') {
    bod = JSON.stringify(decamelizeKeys(body));
    headers['content-type'] = 'application/json';
  } else {
    bod = body as FormData;
  }

  return {
    headers,
    timeout: requestTimeout,
    method,
    searchParams: formatQuery(query),
    prefixUrl: url,
    body: bod,
  };
}

export type RequestHandlerFn = (
  endpoint: string,
  options?: Record<string, unknown>,
) => Promise<{
  body: Record<string, unknown> | Record<string, unknown>[];
  headers: Record<string, unknown>;
  status: number;
}>;

export function createRequesterFn(
  optionsHandler: OptionsHandlerFn,
  requestHandler: RequestHandlerFn,
): (serviceOptions: DefaultServiceOptions) => RequesterType {
  const methods = ['get', 'post', 'put', 'delete', 'stream'];

  return (serviceOptions) => {
    const requester: RequesterType = {} as RequesterType;

    methods.forEach((m) => {
      requester[m] = (endpoint: string, options: Record<string, unknown>) => {
        const requestOptions = optionsHandler(serviceOptions, { ...options, method: m });

        return requestHandler(endpoint, requestOptions);
      };
    });

    return requester;
  };
}

function extendClass<T extends Constructable>(Base: T, customConfig: Record<string, unknown>): T {
  return class extends Base {
    constructor(...options: any[]) {
      const [config, ...opts] = options;

      super({ ...customConfig, ...config }, ...opts);
    }
  };
}

export function modifyServices<T>(services: T, customConfig: Record<string, unknown> = {}): T {
  const updated = {};

  Object.entries(services)
  .filter(([, s]) => typeof s === 'function')  // FIXME: Odd default artifact included in this list during testing
  .forEach(([k, s]) => {    
    updated[k] = extendClass(s, customConfig);
  });

  return updated as T;
}

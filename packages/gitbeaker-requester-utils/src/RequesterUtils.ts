import { decamelizeKeys } from 'xcase';
import * as FormData from 'form-data';
import { stringify } from 'query-string';
import { BaseService } from './BaseService';

// Types
export interface RequesterType {
  get(service: BaseService, endpoint: string, options?: Record<string, unknown>): Promise<any>;
  post(service: BaseService, endpoint: string, options?: Record<string, unknown>): Promise<any>;
  put(service: BaseService, endpoint: string, options?: Record<string, unknown>): Promise<any>;
  delete(service: BaseService, endpoint: string, options?: Record<string, unknown>): Promise<any>;
  stream?(
    service: BaseService,
    endpoint: string,
    options?: Record<string, unknown>,
  ): NodeJS.ReadableStream;
}

export type DefaultRequestService = Pick<
  BaseService,
  'headers' | 'requestTimeout' | 'url' | 'rejectUnauthorized'
>;

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
export function formatQuery(options?: Record<string, unknown>) {
  return stringify(decamelizeKeys(options || {}), {
    arrayFormat: 'bracket',
  });
}

export function defaultRequest(
  service: DefaultRequestService,
  { body, query, sudo, method = 'get' }: DefaultRequestOptions = {},
): DefaultRequestReturn {
  const { headers } = service;
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
    timeout: service.requestTimeout,
    method,
    searchParams: formatQuery(query),
    prefixUrl: service.url,
    body: bod,
  };
}

export function createInstance(optionsHandler, requestHandler): RequesterType {
  const requester: RequesterType = {} as RequesterType;
  const methods = ['get', 'post', 'put', 'delete', 'stream'];

  methods.forEach((m) => {
    /* eslint func-names:0 */
    requester[m] = function (
      service: BaseService,
      endpoint: string,
      options: Record<string, unknown>,
    ) {
      const requestOptions = optionsHandler(service, { ...options, method: m });

      return requestHandler(endpoint, requestOptions);
    };
  });

  return requester;
}

export interface Constructable<T = any> {
  new (...args: any[]): T;
}

function extendClass<T extends Constructable>(Base: T, customConfig: Record<string, unknown>): T {
  return class extends Base {
    constructor(...options: any[]) {
      const [config, ...opts] = options;

      super({ ...customConfig, ...config }, ...opts);
    }
  };
}

export function modifyServices<T extends { [name: string]: Constructable }>(
  services: T,
  customConfig: Record<string, unknown> = {},
) {
  const updated: { [name: string]: Constructable } = {};

  Object.entries(services).forEach(([k, s]) => {
    updated[k] = extendClass(s, customConfig);
  });

  return updated as T;
}

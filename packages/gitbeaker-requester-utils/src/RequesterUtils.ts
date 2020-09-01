import { decamelizeKeys } from 'xcase';
import { stringify } from 'query-string';

// Types
export interface RequesterType {
  get(
    service: Record<string, unknown>,
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<any>;
  post(
    service: Record<string, unknown>,
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<any>;
  put(
    service: Record<string, unknown>,
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<any>;
  delete(
    service: Record<string, unknown>,
    endpoint: string,
    options?: Record<string, unknown>,
  ): Promise<any>;
  stream?(
    service: Record<string, unknown>,
    endpoint: string,
    options?: Record<string, unknown>,
  ): NodeJS.ReadableStream;
}

export interface Service {
  headers: Record<string, string | string[]>;
  requestTimeout: number;
  url: string;
  rejectUnauthorized?: boolean;
}

export type DefaultRequestOptions = {
  body?: FormData | Record<string, unknown>;
  query?: Record<string, unknown>;
  sudo?: string;
  method?: string;
};

// Utility methods
export function formatQuery(options) {
  return stringify(decamelizeKeys(options || {}) as Record<string, unknown>, {
    arrayFormat: 'bracket',
  });
}

export function defaultRequest(
  service: Service,
  { body, query, sudo, method = 'get' }: DefaultRequestOptions = {},
): Record<string, unknown> {
  const { headers } = service;
  let agent;
  let bod;

  if (sudo) headers.sudo = sudo;

  // FIXME: Not the best comparison, but...it will have to do for now.
  if (typeof body === 'object' && body.constructor.name !== 'FormData') {
    bod = JSON.stringify(decamelizeKeys(body));
    headers['content-type'] = 'application/json';
  } else {
    bod = body;
  }

  return {
    agent,
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
    requester[m] = function (service, endpoint, options) {
      const requestOptions = optionsHandler(service, { ...options, method: m });

      return requestHandler(endpoint, requestOptions);
    };
  });

  return requester;
}

export interface Constructable<T = Record<string, unknown>> {
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

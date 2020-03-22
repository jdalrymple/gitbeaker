import FormData from 'form-data';
import { decamelizeKeys } from 'xcase';
import { Agent } from 'https';
import { stringify } from 'query-string';

export interface RequesterType {
  get(service: object, endpoint: string, options?: object): Promise<any>;
  post(service: object, endpoint: string, options?: object): Promise<any>;
  put(service: object, endpoint: string, options?: object): Promise<any>;
  delete(service: object, endpoint: string, options?: object): Promise<any>;
  stream?(service: object, endpoint: string, options?: object): Promise<any>;
}

export interface Service {
  headers: Record<string, string | string[]>;
  requestTimeout: number;
  url: string;
  rejectUnauthorized?: boolean;
}

export type DefaultRequestOptions = {
  body?: FormData | object;
  query?: object;
  sudo?: string;
  method: string;
};

const methods = ['get', 'post', 'put', 'delete', 'stream'];

export function formatQuery(options) {
  return stringify(decamelizeKeys(options || {}) as object, { arrayFormat: 'bracket' });
}

export function defaultRequest(
  service: Service,
  { body, query, sudo, method }: DefaultRequestOptions = { method: 'get' },
): Record<string, string | number | FormData | Record<string, string | string[]>> {
  const { headers } = service;
  let agent;
  let bod;

  if (sudo) headers.sudo = sudo;

  if (typeof body === 'object' && !(body instanceof FormData)) {
    bod = JSON.stringify(decamelizeKeys(body));
    headers['content-type'] = 'application/json';
  } else {
    bod = body;
  }

  if (service.url.includes('https')) {
    agent = new Agent({
      rejectUnauthorized: service.rejectUnauthorized,
    });
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

  methods.forEach((m) => {
    /* eslint func-names:0 */
    requester[m] = function (service, endpoint, options) {
      const requestOptions = optionsHandler(service, { ...options, method: m });
      return requestHandler(endpoint, requestOptions);
    };
  });

  return requester;
}

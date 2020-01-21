import FormData from 'form-data';
import { decamelizeKeys } from 'xcase';
import { Agent } from 'https';
import { formatQuery } from './Utils';

export interface RequesterType {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  stream?: Function;
}

export interface Service {
  headers: Record<string, string | string[]>;
  requestTimeout: number;
  url: string;
  rejectUnauthorized?: boolean;
}

const methods = ['get', 'post', 'put', 'delete', 'stream'];

export function defaultRequest(
  service: Service,
  { body, query, sudo, method },
): Record<string, string | number | Record<string, string | string[]>> {
  const { headers } = service;
  let agent;
  let bod = body;

  if (sudo) headers.sudo = sudo;

  if (typeof body === 'object' && !(body instanceof FormData)) {
    bod = JSON.stringify(decamelizeKeys(body));
    headers['content-type'] = 'application/json';
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

  methods.forEach(m => {
    /* eslint func-names:0 */
    requester[m] = function(service, endpoint, options) {
      const requestOptions = optionsHandler(service, { ...options, method: m });
      return requestHandler(endpoint, requestOptions);
    };
  });

  return requester;
}

export abstract class Requester implements RequesterType {}

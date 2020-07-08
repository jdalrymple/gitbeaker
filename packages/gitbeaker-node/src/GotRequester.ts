import Got from 'got';
import * as FormData from 'form-data';
import { decamelizeKeys } from 'xcase';
import { Agent } from 'https';
import {
  Service,
  DefaultRequestOptions,
  createInstance,
  defaultRequest as baseDefaultRequest,
} from '@gitbeaker/requester-utils';

export function defaultRequest(
  service: Service,
  { body, query, sudo, method }: DefaultRequestOptions = {},
) {
  const options = baseDefaultRequest(service, { body, query, sudo, method });

  if (typeof body === 'object' && !(body instanceof FormData)) {
    options.json = decamelizeKeys(body);

    delete options.body;
  }

  if (service.url.includes('https')) {
    options.agent = {
      https: new Agent({
        rejectUnauthorized: service.rejectUnauthorized,
      }),
    };
  }

  return options;
}

export function processBody(response) {
  const contentType = response.headers['content-type'] || '';

  switch (contentType) {
    case 'application/json': {
      return response.json().then((j) => j || {});
    }
    case 'application/octet-stream':
    case 'binary/octet-stream':
    case 'application/gzip': {
      return response.buffer();
    }
    default: {
      return response.text().then((t) => t || '');
    }
  }
}

export async function handler(endpoint, options) {
  let response;

  try {
    response = await Got(endpoint, options);
  } catch (e) {
    if (e.response) {
      const output = e.response.body;

      e.description = output.error || output.message;
    }

    throw e;
  }

  const { statusCode, headers } = response;
  const body = await processBody(response);

  return { body, headers, status: statusCode };
}

export const Requester = createInstance(defaultRequest, handler);

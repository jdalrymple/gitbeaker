import Got from 'got';
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

  // FIXME: Not the best comparison, but...it will have to do for now.
  if (typeof body === 'object' && body.constructor.name !== 'FormData') {
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

export function processBody({ rawBody, headers }: { rawBody: Buffer; headers: object }) {
  const contentType = headers['content-type'] || '';

  switch (contentType) {
    case 'application/json': {
      return rawBody.length === 0 ? {} : JSON.parse(rawBody.toString());
    }
    case 'application/octet-stream':
    case 'binary/octet-stream':
    case 'application/gzip': {
      return Buffer.from(rawBody);
    }
    default: {
      return rawBody.toString();
    }
  }
}

export async function handler(endpoint, options) {
  let response;

  try {
    response = await Got(endpoint, options);
  } catch (e) {
    if (e.response && typeof e.response.body === 'string' && e.response.body.length > 0) {
      const output = JSON.parse(e.response.body);

      e.description = output.error || output.message;
    }

    throw e;
  }

  const { statusCode, headers } = response;

  const body = processBody(response);

  return { body, headers, status: statusCode };
}

export const Requester = createInstance(defaultRequest, handler);

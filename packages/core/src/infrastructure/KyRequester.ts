import Ky from 'ky';
import { Service, createInstance, defaultRequest as baseDefaultRequest } from './BaseRequester';

function responseHeadersAsObject(response): Record<string, string> {
  const headers = {};
  const keyVals = [...response.headers.entries()];

  keyVals.forEach(([key, val]) => {
    headers[key] = val;
  });

  return headers;
}

function defaultRequest(service: Service, { body, query, sudo, method }) {
  const options = baseDefaultRequest(service, { body, query, sudo, method });

  return { ...options, headers: new Headers(service.headers as Record<string, string>) };
}

function processBody(response) {
  const contentType = response.headers.get('content-type') || '';

  switch (contentType) {
    case 'application/json': {
      return response.json().then(v => v || {});
    }
    case 'application/octet-stream':
    case 'binary/octet-stream':
    case 'application/gzip': {
      return response
        .blob()
        .then(b => new Response(b).arrayBuffer())
        .then(Buffer.from);
    }
    default: {
      return response.text().then(t => t || '');
    }
  }
}

async function handler(endpoint, options) {
  let response;

  try {
    response = await Ky(endpoint, options);
  } catch (e) {
    if (e.response) {
      const output = await e.response.json();

      e.description = output.error || output.message;
    }

    throw e;
  }

  const { status } = response;
  const headers = responseHeadersAsObject(response);
  const body = await processBody(response);

  return { body, headers, status };
}

export const Requester = createInstance(defaultRequest, handler);

export { RequesterType } from './BaseRequester';

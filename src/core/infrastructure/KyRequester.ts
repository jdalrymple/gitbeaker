import Ky from 'ky-universal';
import FormData from 'form-data';
import { decamelizeKeys } from 'xcase';
import { stringify } from 'query-string';

interface Service {
  headers: object;
  requestTimeout: number;
  url: string;
}

const methods = ['get', 'post', 'put', 'delete', 'stream'];
const KyRequester = {};

function responseHeadersAsObject(response): Record<string, string> {
  const headers = {};
  const keyVals = [...response.headers.entries()];

  keyVals.forEach(([key, val]) => {
    headers[key] = val;
  });

  return headers;
}

function defaultRequest(service: Service, { body, query, sudo, method }) {
  const headers = new Headers(service.headers as Record<string, string>);
  let bod = body;

  if (sudo) headers.append('sudo', `${sudo}`);

  if (typeof body === 'object' && !(body instanceof FormData)) {
    bod = JSON.stringify(decamelizeKeys(body));
    headers.append('content-type', 'application/json');
  }

  return {
    timeout: service.requestTimeout,
    headers,
    method: method === 'stream' ? 'get' : method,
    onProgress: method === 'stream' ? () => {} : undefined,
    searchParams: stringify(decamelizeKeys(query || {}) as object, { arrayFormat: 'bracket' }),
    prefixUrl: service.url,
    body: bod,
  };
}

async function processBody(response) {
  const contentType = response.headers.get('content-type') || '';

  switch (contentType) {
    case 'application/json': {
      const json = await response.json();

      return json || {};
    }
    case 'application/octet-stream':
    case 'application/gzip': {
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      return Buffer.from(arrayBuffer);
    }
    default: {
      const text = await response.text();

      return text || '';
    }
  }
}

methods.forEach(m => {
  /* eslint func-names:0 */
  KyRequester[m] = async function(service, endpoint, options) {
    const requestOptions = defaultRequest(service, { ...options, method: m });
    let response;

    try {
      response = await Ky(endpoint, requestOptions);
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
  };
});

export { KyRequester };

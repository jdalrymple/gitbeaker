import Ky from 'ky-universal';
import FormData from 'form-data';
import { decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import { skipAllCaps } from './Utils';
import { Requester } from '.';

const methods = ['get', 'post', 'put', 'delete', 'stream'];
const KyRequester = {} as Requester;

function responseHeadersAsObject(response) {
  const headers = {};
  const keyVals = [...response.headers.entries()];

  keyVals.forEach(([key, val]) => {
    headers[key] = val;
  });

  return headers;
}

function defaultRequest(service: any, { body, query, sudo, method }) {
  const headers = new Headers(service.headers);
  let bod = body;

  if (sudo) headers.append('sudo', `${sudo}`);

  if (typeof body === 'object' && !(body instanceof FormData)) {
    bod = JSON.stringify(decamelizeKeys(body, skipAllCaps));
    headers.append('content-type', 'application/json');
  }

  return {
    timeout: service.requestTimeout,
    headers,
    method: method === 'stream' ? 'get' : method,
    onProgress: method === 'stream' ? () => {} : undefined,
    searchParams: stringify(decamelizeKeys(query || {}) as any, { arrayFormat: 'bracket' }),
    prefixUrl: service.url,
    body: bod,
  };
}

async function processBody(response) {
  const contentType = response.headers.get('content-type') || '';

  switch (contentType) {
    case 'application/json':
      const json = await response.json();

      return json || {};
    case 'application/octet-stream':
    case 'application/gzip':
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      return Buffer.from(arrayBuffer);
    default:
      const text = await response.text();

      return text || '';
  }
}

methods.forEach(m => {
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

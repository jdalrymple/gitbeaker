import Ky from 'ky-universal';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { stringify } from 'query-string';
import { Requester, DefaultRequestOptions } from '../../types/types';
import { skipAllCaps } from './Utils';

const methods = ['get', 'post', 'put', 'delete'];
const KyRequester = {} as Requester;

function defaultRequest(
  service: any,
  endpoint: string,
  { body, query, sudo }: DefaultRequestOptions,
) {
  const headers = new Headers(service.headers);

  if (sudo) headers.append('sudo', `${sudo}`);

  return [
    endpoint,
    {
      headers,
      searchParams: stringify(decamelizeKeys(query || {}), { arrayFormat: 'bracket' }),
      prefixUrl: service.url,
      json: typeof body === 'object' ? decamelizeKeys(body, skipAllCaps) : body,
      rejectUnauthorized: service.rejectUnauthorized,
    },
  ];
}

methods.forEach(m => {
  KyRequester[m] = async function(service, endpoint, options) {
    const response = await Ky[m](...defaultRequest(service, endpoint, options));
    const { status } = response;
    let { headers } = response;
    let body = await response.json();

    if (typeof body === 'object') {
      body = camelizeKeys(body || {});
    }

    headers = headers || {};

    return { body, headers, status };
  };
});

export { KyRequester };

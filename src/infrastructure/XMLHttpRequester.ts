import { StatusCodeError } from 'request-promise-core/errors';
import { promisify } from 'util';
import XHR, { XhrUriConfig, XhrUrlConfig } from 'xhr';
import { wait } from './RequestHelper';

export interface XhrInstancePromisified {
  (options: XhrUriConfig | XhrUrlConfig): Promise<temporaryAny>;
}

export interface XhrStaticPromisified extends XhrInstancePromisified {
  del: XhrInstancePromisified;
  delete: XhrInstancePromisified;
  get: XhrInstancePromisified;
  head: XhrInstancePromisified;
  patch: XhrInstancePromisified;
  post: XhrInstancePromisified;
  put: XhrInstancePromisified;
}

interface XhrConfgExtraParams {
  resolveWithFullResponse?: boolean;
}

function promisifyWithRetry<F extends Function>(fn: F): XhrInstancePromisified {
  const promisifiedFn = promisify(fn);

  return async function getResponse(
    opts: XhrUriConfig & XhrConfgExtraParams | XhrUrlConfig & XhrConfgExtraParams,
  ) {
    const response = await promisifiedFn(opts);
    const sleepTime = parseInt(response.headers['retry-after'], 10);
    if (response.statusCode === 429 && sleepTime) {
      await wait(sleepTime * 1000);
    } else if (response.statusCode >= 400 && response.statusCode <= 599) {
      throw new StatusCodeError(response.statusCode, response.body, {}, null);
    }

    return opts.resolveWithFullResponse ? response : response.body;
  } as XhrInstancePromisified;
}

const promisifyWithRetryDelete = promisifyWithRetry(XHR.del);
const XMLHttpRequesterPromisifiedExtras = {
  del: promisifyWithRetryDelete,
  delete: promisifyWithRetryDelete,
  get: promisifyWithRetry(XHR.get),
  head: promisifyWithRetry(XHR.head),
  patch: promisifyWithRetry(XHR.patch),
  post: promisifyWithRetry(XHR.post),
  put: promisifyWithRetry(XHR.put),
};

const XMLHttpRequester: XhrStaticPromisified = Object.assign(
  promisifyWithRetry(XHR),
  XMLHttpRequesterPromisifiedExtras,
);

export default XMLHttpRequester;

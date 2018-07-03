import { StatusCodeError } from 'request-promise-core/errors';
import Promisify from 'util.promisify';
import XHR from 'xhr';
import wait from './RequestHelper';

function promisifyFn(fn) {
  const promisifiedFn = Promisify(fn);

  return async function getResponse(opts) {
    const response = await promisifiedFn(opts);
    const sleepTime = parseInt(response.headers['retry-after'], 10);
    if (response.statusCode === 429 && sleepTime) {
      await wait(sleepTime * 1000);
    } else if (response.statusCode >= 400 && response.statusCode <= 599) {
      throw new StatusCodeError(response.statusCode, response.body, {}, null);
    }

    return opts.resolveWithFullResponse ? response : response.body;
  };
}

const XMLHttpRequester = promisifyFn(XHR);

XMLHttpRequester.del = promisifyFn(XHR.del);
XMLHttpRequester.delete = XMLHttpRequester.del;
XMLHttpRequester.get = promisifyFn(XHR.get);
XMLHttpRequester.head = promisifyFn(XHR.head);
XMLHttpRequester.patch = promisifyFn(XHR.patch);
XMLHttpRequester.post = promisifyFn(XHR.post);
XMLHttpRequester.put = promisifyFn(XHR.put);

export default XMLHttpRequester;

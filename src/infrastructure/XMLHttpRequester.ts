import { StatusCodeError } from 'request-promise-core/errors';
import { promisify } from 'util';
import XHR from 'xhr';
import { wait, RequestParametersInput } from './RequestHelper';

function promisifyFn<F extends Function>(fn: F) {
  const promisifiedFn = promisify(fn);

  return async function getResponse(opts: RequestParametersInput) {
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
// Temporarily ignore typechecks, so that we can assign props to `XMLHttpRequester`
// typed as `const XMLHttpRequester: (opts: any) => Promise<any>`
// @ts-ignore
XMLHttpRequester.del = promisifyFn(XHR.del);
// @ts-ignore
XMLHttpRequester.delete = XMLHttpRequester.del;
// @ts-ignore
XMLHttpRequester.get = promisifyFn(XHR.get);
// @ts-ignore
XMLHttpRequester.head = promisifyFn(XHR.head);
// @ts-ignore
XMLHttpRequester.patch = promisifyFn(XHR.patch);
// @ts-ignore
XMLHttpRequester.post = promisifyFn(XHR.post);
// @ts-ignore
XMLHttpRequester.put = promisifyFn(XHR.put);

export default XMLHttpRequester;

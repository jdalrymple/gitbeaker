import {
  StatusCodeError,
} from 'request-promise-core/errors';
import Promisify from 'util.promisify';
import XHR from 'xhr';

const promisifyFn = (fn) => {
  const promisifiedFn = Promisify(fn);

  return async (opts) => {
    const response = await promisifiedFn(opts);

    if (response.statusCode >= 400 && response.statusCode <= 599) {
      throw new StatusCodeError(response.statusCode, response.body, {}, null);
    }

    return response;
  };
};

const XMLHttpRequester = promisifyFn(XHR);
XMLHttpRequester.del = promisifyFn(XHR.del);
XMLHttpRequester.delete = XMLHttpRequester.del;
XMLHttpRequester.get = promisifyFn(XHR.get);
XMLHttpRequester.head = promisifyFn(XHR.head);
XMLHttpRequester.patch = promisifyFn(XHR.patch);
XMLHttpRequester.post = promisifyFn(XHR.post);
XMLHttpRequester.put = promisifyFn(XHR.put);

export default XMLHttpRequester;

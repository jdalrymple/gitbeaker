import Promisify from 'util.promisify';
import XHR from 'xhr';

function PromisifyWithFullResponseOption(fn) {
  const promisifiedFn = Promisify(fn);

  return async (params) => {
    const response = await promisifiedFn(params);

    return params.resolveWithFullResponse
      ? response
      : response.body;
  };
}

const XMLHttpRequester = PromisifyWithFullResponseOption(XHR);
XMLHttpRequester.del = PromisifyWithFullResponseOption(XHR.del);
XMLHttpRequester.delete = XMLHttpRequester.del;
XMLHttpRequester.get = PromisifyWithFullResponseOption(XHR.get);
XMLHttpRequester.head = PromisifyWithFullResponseOption(XHR.head);
XMLHttpRequester.patch = PromisifyWithFullResponseOption(XHR.patch);
XMLHttpRequester.post = PromisifyWithFullResponseOption(XHR.post);
XMLHttpRequester.put = PromisifyWithFullResponseOption(XHR.put);

export default XMLHttpRequester;

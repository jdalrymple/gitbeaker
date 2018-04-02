import Promisify from 'util.promisify';
import XHR from 'xhr';

const XMLHttpRequester = Promisify(XHR);
XMLHttpRequester.del = Promisify(XHR.del);
XMLHttpRequester.get = Promisify(XHR.get);
XMLHttpRequester.head = Promisify(XHR.head);
XMLHttpRequester.patch = Promisify(XHR.patch);
XMLHttpRequester.post = Promisify(XHR.post);
XMLHttpRequester.put = Promisify(XHR.put);

export default XMLHttpRequester;

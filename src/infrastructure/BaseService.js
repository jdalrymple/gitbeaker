import URLJoin from 'url-join';
import Request from 'request-promise';
import XMLHttpRequester from './XMLHttpRequester';

class BaseModel {
  constructor({
   url = 'https://gitlab.com', token, oauthToken, useXMLHttpRequest = false
  } = {}) {
    this.url = URLJoin(url, 'api', 'v4');
    this.headers = {};
    this.requester = useXMLHttpRequest ? XMLHttpRequester : Request;
    this.useXMLHttpRequest = useXMLHttpRequest;

    if (oauthToken) {
      this.headers.authorization = `Bearer ${oauthToken}`;
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw new Error('`token` (private-token) or `oauth_token` is mandatory');
    }
  }
}

export default BaseModel;

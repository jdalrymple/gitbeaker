import URLJoin from 'url-join';
import Request from 'request-promise';
import XMLHttpRequester from './XMLHttpRequester';

class BaseModel {
  constructor({
    token,
    oauthToken,
    url = 'https://gitlab.com',
    useXMLHttpRequest = false,
    version = 'v4',
    rejectUnauthorized = true,
  } = {}) {
    this.url = URLJoin(url, 'api', version);
    this.headers = {};
    this.requester = useXMLHttpRequest ? XMLHttpRequester : Request;
    this.useXMLHttpRequest = useXMLHttpRequest;
    this.rejectUnauthorized = rejectUnauthorized;

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

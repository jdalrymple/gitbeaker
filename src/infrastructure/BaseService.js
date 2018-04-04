import URLJoin from 'url-join';

class BaseModel {
  constructor({ url = 'https://gitlab.com', token, oauthToken }) {
    this.url = URLJoin(url, 'api', 'v4');
    this.headers = {};

    if (oauthToken) {
      this.headers.Authorization = `Bearer ${oauthToken}`;
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw new Error('`token` (private-token) or `oauth_token` is mandatory');
    }
  }
}

export default BaseModel;

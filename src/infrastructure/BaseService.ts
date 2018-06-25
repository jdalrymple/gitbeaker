import URLJoin from 'url-join';
import Request from 'request-promise';
import XMLHttpRequester from './XMLHttpRequester';

interface BaseModelOptions {
  url?: string;
  token?: string;
  oauthToken?: string;
  useXMLHttpRequest?: boolean;
}
class BaseModel {
  protected url: string;
  public headers: { [header: string]: string };
  protected requester: any;
  protected useXMLHttpRequest: boolean;

  constructor(options: BaseModelOptions & Required<Pick<BaseModelOptions, 'token'>>);
  constructor(options: BaseModelOptions & Required<Pick<BaseModelOptions, 'oauthToken'>>);
  constructor({
    url = 'https://gitlab.com', token, oauthToken, useXMLHttpRequest = false,
  }: BaseModelOptions = {}) {
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

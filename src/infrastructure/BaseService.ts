import URLJoin from 'url-join';
import Request from 'request-promise';
import XMLHttpRequester, { XhrStaticPromisified } from './XMLHttpRequester';

interface BaseModelOptions {
  url?: string;
  token?: string;
  oauthToken?: string;
  useXMLHttpRequest?: boolean;
  version?: string;
  sudo?: string | number;
  rejectUnauthorized?: boolean;
}

export type BaseModelContructorOptions =
  | BaseModelOptions & Required<Pick<BaseModelOptions, 'token'>>
  | BaseModelOptions & Required<Pick<BaseModelOptions, 'oauthToken'>>;
class BaseModel {
  public url: string;
  public readonly headers: { [header: string]: string | number};
  public readonly rejectUnauthorized: boolean;
  public readonly requester: XhrStaticPromisified;
  public readonly useXMLHttpRequest: boolean;

  constructor({
    token,
    oauthToken,
    sudo,
    url = 'https://gitlab.com',
    useXMLHttpRequest = false,
    version = 'v4',
    rejectUnauthorized = true,
  }: BaseModelContructorOptions) {
    this.url = URLJoin(url, 'api', version);
    this.headers = {};
    this.requester = useXMLHttpRequest
      ? XMLHttpRequester : (Request as temporaryAny as XhrStaticPromisified);
    this.useXMLHttpRequest = useXMLHttpRequest;
    this.rejectUnauthorized = rejectUnauthorized;

    // Handle auth tokens
    if (oauthToken) this.headers.authorization = `Bearer ${oauthToken}`;
    else if (token) this.headers['private-token'] = token;

    // Set sudo
    if (sudo) this.headers['Sudo'] = sudo;
  }
}

export default BaseModel;

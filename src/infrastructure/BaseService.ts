import URLJoin from 'url-join';
import Request from 'request-promise';
import XMLHttpRequester from './XMLHttpRequester';

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
  protected url: string;
  public headers: { [header: string]: string | number};
  public rejectUnauthorized: boolean;
  protected requester: any;
  protected useXMLHttpRequest: boolean;

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
    this.requester = useXMLHttpRequest ? XMLHttpRequester : Request;
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

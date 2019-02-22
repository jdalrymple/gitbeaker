import URLJoin from 'url-join';
import Request from 'request-promise';
import XMLHttpRequester, { XhrStaticPromisified } from './XMLHttpRequester';

interface BaseModelOptions {
  url?: string;
  token?: string;
  jobToken?: string;
  oauthToken?: string;
  useXMLHttpRequest?: boolean;
  version?: string;
  sudo?: string | number;
  rejectUnauthorized?: boolean;
}

export type BaseModelContructorOptions =
  | BaseModelOptions & Required<Pick<BaseModelOptions, 'token'>>
  | BaseModelOptions & Required<Pick<BaseModelOptions, 'jobToken'>>
  | BaseModelOptions & Required<Pick<BaseModelOptions, 'oauthToken'>>;
class BaseModel {
  public url: string;
  public readonly headers: { [header: string]: string | number};
  public readonly rejectUnauthorized: boolean;
  public readonly requester: XhrStaticPromisified;
  public readonly useXMLHttpRequest: boolean;

  constructor({
    token,
    jobToken,
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
    else if (jobToken) this.headers['job-token'] = jobToken;
    else if (token) this.headers['private-token'] = token;

    // Set sudo
    if (sudo) this.headers['Sudo'] = sudo;
  }
}

export default BaseModel;

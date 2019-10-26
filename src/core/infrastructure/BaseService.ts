import { KyRequester } from './KyRequester';

export interface Requester {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  stream?: Function;
}

export interface BaseServiceOptions {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  host?: string;
  url?: string;
  version?: 'v3' | 'v4';
  rejectUnauthorized?: boolean;
  camelize?: boolean;
  requester?: Requester;
  requestTimeout?: number;
  profileToken?: string;
  sudo?: string | number;
  profileMode?: 'execution' | 'memory';
}

export class BaseService {
  public readonly url: string;
  public readonly requester: Requester;
  public readonly requestTimeout: number;
  public readonly headers: { [header: string]: string };
  public readonly camelize: boolean;
  public readonly rejectUnauthorized: boolean;

  constructor({
    token,
    jobToken,
    oauthToken,
    sudo,
    profileToken,
    profileMode = 'execution',
    host = 'https://gitlab.com',
    url = '',
    version = 'v4',
    camelize = false,
    rejectUnauthorized = true,
    requester = KyRequester as Requester,
    requestTimeout = 300000,
  }: BaseServiceOptions = {}) {
    this.url = [host, 'api', version, url].join('/');
    this.headers = {};
    this.rejectUnauthorized = rejectUnauthorized;
    this.camelize = camelize;
    this.requester = requester;
    this.requestTimeout = requestTimeout;

    // Handle auth tokens
    if (oauthToken) this.headers.authorization = `Bearer ${oauthToken}`;
    else if (jobToken) this.headers['job-token'] = jobToken;
    else if (token) this.headers['private-token'] = token;

    // Profiling
    if (profileToken) {
      this.headers['X-Profile-Token'] = profileToken;

      if (profileMode) this.headers['X-Profile-Mode'] = profileMode;
    }

    // Set sudo
    if (sudo) this.headers['Sudo'] = `${sudo}`;
  }
}

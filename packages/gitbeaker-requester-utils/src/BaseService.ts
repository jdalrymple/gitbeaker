import type { RequesterType } from './RequesterUtils';

export interface BaseServiceOptions {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  host?: string;
  url?: string;
  version?: 3 | 4;
  rejectUnauthorized?: boolean;
  camelize?: boolean;
  requester?: RequesterType;
  requestTimeout?: number;
  profileToken?: string;
  sudo?: string | number;
  profileMode?: 'execution' | 'memory';
}

export class BaseService {
  public readonly url: string;

  public readonly requester: RequesterType;

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
    requester,
    profileMode = 'execution',
    host = 'https://gitlab.com',
    url = '',
    version = 4,
    camelize = false,
    rejectUnauthorized = true,
    requestTimeout = 300000,
  }: BaseServiceOptions = {}) {
    if (!requester) throw new ReferenceError('Requester must be passed');

    this.url = [host, 'api', `v${version}`, url].join('/');
    this.headers = {
      'user-agent': 'gitbeaker',
    };
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
      this.headers['X-Profile-Mode'] = profileMode;
    }

    // Set sudo
    if (sudo) this.headers.Sudo = `${sudo}`;
  }
}

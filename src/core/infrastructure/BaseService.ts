import { KyRequester } from './KyRequester';
import { Requester, BaseServiceOptions } from '.';

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
    requester = KyRequester,
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

import { RequesterType, DefaultResourceOptions } from './RequesterUtils';

export interface BaseResourceOptions<C> {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  host?: string;
  prefixUrl?: string;
  version?: 3 | 4;
  rejectUnauthorized?: boolean;
  camelize?: C;
  requesterFn?: (resourceOptions: DefaultResourceOptions) => RequesterType;
  requestTimeout?: number;
  profileToken?: string;
  sudo?: string | number;
  profileMode?: 'execution' | 'memory';
}

export class BaseResource<C extends boolean = false> {
  public readonly url: string;

  public readonly requester: RequesterType;

  public readonly requestTimeout: number;

  public readonly headers: { [header: string]: string };

  public readonly camelize: C | undefined;

  public readonly rejectUnauthorized: boolean;

  constructor({
    token,
    jobToken,
    oauthToken,
    sudo,
    profileToken,
    requesterFn,
    camelize,
    profileMode = 'execution',
    host = 'https://gitlab.com',
    prefixUrl = '',
    version = 4,
    rejectUnauthorized = true,
    requestTimeout = 300000,
  }: BaseResourceOptions<C> = {}) {
    if (!requesterFn) throw new ReferenceError('requesterFn must be passed');

    this.url = [host, 'api', `v${version}`, prefixUrl].join('/');

    this.headers = {
      'user-agent': 'gitbeaker',
    };
    this.rejectUnauthorized = rejectUnauthorized;
    this.camelize = camelize;
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

    // Set requester instance using this information
    this.requester = requesterFn({ ...this });
  }
}

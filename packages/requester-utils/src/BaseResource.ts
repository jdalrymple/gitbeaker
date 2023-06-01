import { DefaultResourceOptions, RequesterType } from './RequesterUtils';

export interface BaseResourceOptions<C> {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  host?: string;
  prefixUrl?: string;
  rejectUnauthorized?: boolean;
  camelize?: C;
  requesterFn: (resourceOptions: DefaultResourceOptions) => RequesterType;
  queryTimeout?: number | null;
  profileToken?: string;
  sudo?: string | number;
  profileMode?: 'execution' | 'memory';
}

export class BaseResource<C extends boolean = false> {
  public readonly url: string;

  public readonly requester: RequesterType;

  public readonly queryTimeout: number | null;

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
    rejectUnauthorized = true,
    queryTimeout = 300000,
  }: BaseResourceOptions<C>) {
    if (!requesterFn) throw new ReferenceError('requesterFn must be passed');

    this.url = [host, 'api', 'v4', prefixUrl].join('/');
    this.headers = {};
    this.rejectUnauthorized = rejectUnauthorized;
    this.camelize = camelize;
    this.queryTimeout = queryTimeout;

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

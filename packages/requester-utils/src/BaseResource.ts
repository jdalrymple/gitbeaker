import { DefaultResourceOptions, RequesterType } from './RequesterUtils';

export interface RootResourceOptions<C> {
  // TODO: Not actually optional - Need to fix wrapper typing in requestUtils.ts:
  requesterFn?: (resourceOptions: DefaultResourceOptions) => RequesterType;
  host?: string;
  prefixUrl?: string;
  rejectUnauthorized?: boolean;
  camelize?: C;
  queryTimeout?: number | null;
  sudo?: string | number;
  profileToken?: string;
  profileMode?: 'execution' | 'memory';
}

export interface BaseRequestOptionsWithOAuthToken<C> extends RootResourceOptions<C> {
  oauthToken: string;
}

export interface BaseRequestOptionsWithAccessToken<C> extends RootResourceOptions<C> {
  token: string;
}

export interface BaseRequestOptionsWithJobToken<C> extends RootResourceOptions<C> {
  jobToken: string;
}

export type BaseResourceOptions<C> =
  | BaseRequestOptionsWithOAuthToken<C>
  | BaseRequestOptionsWithAccessToken<C>
  | BaseRequestOptionsWithJobToken<C>;

export class BaseResource<C extends boolean = false> {
  public readonly url: string;

  public readonly requester: RequesterType;

  public readonly queryTimeout: number | null;

  public readonly headers: { [header: string]: string };

  public readonly camelize: C | undefined;

  public readonly rejectUnauthorized: boolean;

  constructor({
    sudo,
    profileToken,
    camelize,
    requesterFn,
    profileMode = 'execution',
    host = 'https://gitlab.com',
    prefixUrl = '',
    rejectUnauthorized = true,
    queryTimeout = 300000,
    ...tokens
  }: BaseResourceOptions<C>) {
    if (!requesterFn) throw new ReferenceError('requesterFn must be passed');

    this.url = [host, 'api', 'v4', prefixUrl].join('/');
    this.headers = {};
    this.rejectUnauthorized = rejectUnauthorized;
    this.camelize = camelize;
    this.queryTimeout = queryTimeout;

    // Handle auth tokens
    if ('oauthToken' in tokens) this.headers.authorization = `Bearer ${tokens.oauthToken}`;
    else if ('jobToken' in tokens) this.headers['job-token'] = tokens.jobToken;
    else if ('token' in tokens) this.headers['private-token'] = tokens.token;
    else {
      throw new ReferenceError('A token, oauthToken or jobToken must be passed');
    }

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

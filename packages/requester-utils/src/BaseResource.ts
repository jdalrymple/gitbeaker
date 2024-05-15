import { RateLimitOptions, RequesterType, ResourceOptions } from './RequesterUtils';

export interface RootResourceOptions<C> {
  // TODO: Not actually optional - Need to fix wrapper typing in requestUtils.ts:
  requesterFn?: (resourceOptions: ResourceOptions) => RequesterType;
  host?: string;
  prefixUrl?: string;
  rejectUnauthorized?: boolean;
  camelize?: C;
  queryTimeout?: number | null;
  sudo?: string | number;
  profileToken?: string;
  profileMode?: 'execution' | 'memory';
  rateLimits?: RateLimitOptions;
}

export type GitlabToken = string | (() => Promise<string>);

export interface BaseRequestOptionsWithOAuthToken<C> extends RootResourceOptions<C> {
  oauthToken: GitlabToken;
}

export interface BaseRequestOptionsWithAccessToken<C> extends RootResourceOptions<C> {
  token: GitlabToken;
}

export interface BaseRequestOptionsWithJobToken<C> extends RootResourceOptions<C> {
  jobToken: GitlabToken;
}

export interface BaseRequestOptionsWithoutToken<C> extends RootResourceOptions<C> {}

export type BaseResourceOptions<C> =
  | BaseRequestOptionsWithoutToken<C>
  | BaseRequestOptionsWithOAuthToken<C>
  | BaseRequestOptionsWithAccessToken<C>
  | BaseRequestOptionsWithJobToken<C>;

function getDynamicToken(tokenArgument: (() => Promise<string>) | string): Promise<string> {
  return tokenArgument instanceof Function ? tokenArgument() : Promise.resolve(tokenArgument);
}

// Default rate limits per minute
const DEFAULT_RATE_LIMITS = Object.freeze({
  // Default rate limit
  '**': 3000,

  // Import/Export
  'projects/import': 6,
  'projects/*/export': 6,
  'projects/*/download': 1,
  'groups/import': 6,
  'groups/*/export': 6,
  'groups/*/download': 1,

  // Note creation
  'projects/*/issues/*/notes': {
    method: 'post',
    limit: 300,
  },
  'projects/*/snippets/*/notes': {
    method: 'post',
    limit: 300,
  },
  'projects/*/merge_requests/*/notes': {
    method: 'post',
    limit: 300,
  },
  'groups/*/epics/*/notes': {
    method: 'post',
    limit: 300,
  },

  // Repositories - get file archive
  'projects/*/repository/archive*': 5,

  // Project Jobs
  'projects/*/jobs': 600,

  // Member deletion
  'projects/*/members': 60,
  'groups/*/members': 60,
});

export class BaseResource<C extends boolean = false> {
  public readonly url: string;

  public readonly requester: RequesterType;

  public readonly queryTimeout: number | null;

  public readonly headers: { [header: string]: string };

  public readonly authHeaders: { [authHeader: string]: () => Promise<string> };

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
    rateLimits = DEFAULT_RATE_LIMITS,
    ...tokens
  }: BaseResourceOptions<C>) {
    if (!requesterFn) throw new ReferenceError('requesterFn must be passed');

    this.url = [host, 'api', 'v4', prefixUrl].join('/');
    this.headers = {};
    this.authHeaders = {};
    this.rejectUnauthorized = rejectUnauthorized;
    this.camelize = camelize;
    this.queryTimeout = queryTimeout;

    // Handle auth tokens
    if ('oauthToken' in tokens)
      this.authHeaders.authorization = async () => {
        const token = await getDynamicToken(tokens.oauthToken);

        return `Bearer ${token}`;
      };
    else if ('jobToken' in tokens)
      this.authHeaders['job-token'] = async () => getDynamicToken(tokens.jobToken);
    else if ('token' in tokens)
      this.authHeaders['private-token'] = async () => getDynamicToken(tokens.token);

    // Profiling
    if (profileToken) {
      this.headers['X-Profile-Token'] = profileToken;
      this.headers['X-Profile-Mode'] = profileMode;
    }

    // Set sudo
    if (sudo) this.headers.Sudo = `${sudo}`;

    // Set requester instance using this information
    this.requester = requesterFn({ ...this, rateLimits });
  }
}

import { RequesterType, DefaultServiceOptions } from './RequesterUtils';

export interface NativeAuth {
  gitlabSessionCookieKey?: string;
  gitlabSessionCookieValue: string;
  gitlabCSRFTokenKey?: string;
  gitlabCSRFTokenValue: string;
}

export interface BaseServiceOptions<C> {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  nativeAuth?: NativeAuth;
  host?: string;
  prefixUrl?: string;
  version?: 3 | 4;
  rejectUnauthorized?: boolean;
  camelize?: C;
  requesterFn?: (serviceOptions: DefaultServiceOptions) => RequesterType;
  requestTimeout?: number;
  profileToken?: string;
  sudo?: string | number;
  profileMode?: 'execution' | 'memory';
}

export class BaseService<C extends boolean = false> {
  public readonly url: string;

  public readonly requester: RequesterType;

  public readonly requestTimeout: number;

  public readonly headers: { [header: string]: string };

  public readonly camelize: C | undefined;

  public readonly rejectUnauthorized: boolean;

  public readonly additionalBody: FormData | Record<string, unknown>;

  constructor({
    token,
    jobToken,
    oauthToken,
    nativeAuth,
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
  }: BaseServiceOptions<C> = {}) {
    if (!requesterFn) throw new ReferenceError('requesterFn must be passed');

    this.url = [host, 'api', `v${version}`, prefixUrl].join('/');

    this.headers = {
      'user-agent': 'gitbeaker',
    };
    this.rejectUnauthorized = rejectUnauthorized;
    this.camelize = camelize;
    this.requestTimeout = requestTimeout;
    this.additionalBody = {};

    // Handle auth tokens
    if (oauthToken) this.headers.authorization = `Bearer ${oauthToken}`;
    else if (jobToken) this.headers['job-token'] = jobToken;
    else if (token) this.headers['private-token'] = token;
    else if (nativeAuth?.gitlabSessionCookieValue && nativeAuth?.gitlabCSRFTokenValue) {
      /**
       * handle the defaults here, since if the `nativeAuth` is an object,
       * and if these fields aren't provided but others are -
       * the defaults @ param initialization would get overridden.
       */
      const {
        gitlabSessionCookieKey = '_gitlab_session',
        gitlabSessionCookieValue,
        gitlabCSRFTokenKey = 'authenticity_token',
        gitlabCSRFTokenValue,
      } = nativeAuth;

      /**
       * Step 1 - handle CSRF
       *
       * some gitlab instances need the CSRF token to be added via the body,
       * and some need the `X-CSRF-Token` header. We handle both.
       */
      this.additionalBody = { ...this.additionalBody, [gitlabCSRFTokenKey]: gitlabCSRFTokenValue };
      this.headers['X-CSRF-Token'] = gitlabCSRFTokenValue;

      /**
       * Step 2 - handle the session cookie
       */
      if (!this.headers.cookie) this.headers.cookie = 'cookie: ';

      this.headers.cookie += `${gitlabSessionCookieKey}=${gitlabSessionCookieValue}; `;
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

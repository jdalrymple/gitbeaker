interface BaseServiceOptions {
  url?: string;
  token?: string;
  oauthToken?: string;
  version?: string;
  sudo?: string | number;
  rejectUnauthorized?: boolean;
}

class BaseService {
  protected url: string;
  public headers: { [header: string]: string | number};
  public rejectUnauthorized: boolean;

  constructor(options: BaseServiceOptions & Required<Pick<BaseServiceOptions, 'token'>>);
  constructor(options: BaseServiceOptions & Required<Pick<BaseServiceOptions, 'oauthToken'>>);
  constructor({
    token,
    oauthToken,
    sudo,
    url = 'https://gitlab.com',
    version = 'v4',
    rejectUnauthorized = true,
  }: BaseServiceOptions = {}) {
    this.url = [url, 'api', version].join('/');
    this.headers = {};
    this.rejectUnauthorized = rejectUnauthorized;

    // Handle auth tokens
    if (oauthToken) this.headers.authorization = `Bearer ${oauthToken}`;
    else if (token) this.headers['private-token'] = token;

    // Set sudo
    if (sudo) this.headers['Sudo'] = sudo;

    // Freeze properties
    Object.freeze(this);
  }
}

export default BaseService;

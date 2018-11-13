import { BaseServiceOptions } from '@src/types';

class BaseService {
  protected readonly url: string;
  public readonly headers: { [header: string]: string | number};
  public readonly rejectUnauthorized: boolean;

  constructor({
    token,
    oauthToken,
    sudo,
    host = 'https://gitlab.com',
    url = '',
    version = 'v4',
    rejectUnauthorized = true,
  }: BaseServiceOptions) {
    this.url = [host, 'api', version, url].join('/');
    this.headers = {};
    this.rejectUnauthorized = rejectUnauthorized;

    // Handle auth tokens
    if (oauthToken) this.headers.authorization = `Bearer ${oauthToken}`;
    else if (token) this.headers['private-token'] = token;

    // Set sudo
    if (sudo) this.headers['Sudo'] = sudo;
  }
}

export default BaseService;

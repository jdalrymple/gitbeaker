import { BaseServiceOptions } from '@typings';
import Request from 'got';

class BaseService {
  protected readonly url: string;
  protected readonly requester: object;
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
    requester = Request,
  }: BaseServiceOptions) {
    this.url = [host, 'api', version, url].join('/');
    this.headers = {};
    this.rejectUnauthorized = rejectUnauthorized;
    this.requester = requester;

    // Handle auth tokens
    if (oauthToken) this.headers.authorization = `Bearer ${oauthToken}`;
    else if (token) this.headers['private-token'] = token;

    // Set sudo
    if (sudo) this.headers['Sudo'] = sudo;
  }
}

export default BaseService;

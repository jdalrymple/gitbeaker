import Request from 'got';
import { BaseServiceOptions } from '../../types/types';

export class BaseService {
  public readonly url: string;
  public readonly requester: Request;
  public readonly headers: { [header: string]: string | number};
  public readonly rejectUnauthorized: boolean;

  constructor({
    token,
    jobToken,
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
    else if (jobToken) this.headers['job-token'] = jobToken;
    else if (token) this.headers['private-token'] = token;

    // Set sudo
    if (sudo) this.headers['Sudo'] = sudo;
  }
}

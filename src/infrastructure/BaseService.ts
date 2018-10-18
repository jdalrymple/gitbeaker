import URLJoin from 'url-join';

interface BaseModelOptions {
  url?: string;
  token?: string;
  oauthToken?: string;
  version?: string;
  sudo?: string | number;
  rejectUnauthorized?: boolean;
}

class BaseModel {
  protected url: string;
  public headers: { [header: string]: string | number};
  public rejectUnauthorized: boolean;

  constructor(options: BaseModelOptions & Required<Pick<BaseModelOptions, 'token'>>);
  constructor(options: BaseModelOptions & Required<Pick<BaseModelOptions, 'oauthToken'>>);
  constructor({
    token,
    oauthToken,
    sudo,
    url = 'https://gitlab.com',
    version = 'v4',
    rejectUnauthorized = true,
  }: BaseModelOptions = {}) {
    this.url = URLJoin(url, 'api', version);
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

export default BaseModel;

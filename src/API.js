import Request from 'request-promise';
import URLJoin from 'url-join';
import { Groups, Projects, Issues, Runners, Users, MergeRequests, Version } from './Models';

function defaultRequest(url, endpoint, auth, {
  headers,
  body,
  qs,
  formData,
  resolveWithFullResponse = false,
}) {
  const params = {
    url: URLJoin(url, endpoint),
    headers,
    json: true,
    auth
  };

  if (body) params.body = body;
  if (qs) params.qs = qs;
  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

  return params;
}

class API {
  constructor({ url = 'https://gitlab.com', token, oauthToken, basicAuth }) {
    this.url = URLJoin(url, 'api', 'v4');
    this.headers = {};
    this.auth = basicAuth

    if (oauthToken) {
      this.headers.Authorization = `Bearer ${oauthToken}`;
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw new Error('`token` (private-token) or `oauth_token` is mandatory');
    }

    this.groups = new Groups(this);
    this.projects = new Projects(this);
    this.issues = new Issues(this);
    this.users = new Users(this);
    this.runners = new Runners(this);
    this.mergeRequests = new MergeRequests(this);
    this.version = new Version(this);
  }

  get(endpoint, options, fullResponse = false) {
    return Request.get(defaultRequest(this.url, endpoint, this.auth, {
      headers: this.headers,
      qs: options,
      resolveWithFullResponse: fullResponse,
    }));
  }

  post(endpoint, options) {
    return Request.post(defaultRequest(this.url, endpoint, this.auth, {
      headers: this.headers,
      body: options,
    }));
  }

  postForm(endpoint, options) {
    return Request.post(defaultRequest(this.url, endpoint, this.auth, {
      headers: this.headers,
      formData: options,
    }));
  }

  put(endpoint, options) {
    return Request.put(defaultRequest(this.url, endpoint, this.auth, {
      headers: this.headers,
      body: options,
    }));
  }

  delete(endpoint, options) {
    return Request.delete(defaultRequest(this.url, endpoint, this.auth, {
      headers: this.headers,
      qs: options,
    }));
  }
}

export default API;

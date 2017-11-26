const Request = require('request-promise');
const { Groups, Projects, Issues, Runners, Users, Labels } = require('./Models');

function defaultRequest(url, endpoint, { headers, body, qs, formData, resolveWithFullResponse = false }) {
  const params = {
    url: `${url}${endpoint}`,
    headers,
    json: true,
  };

  if (body) params.body = body;
  if (qs) params.qs = qs;
  if (formData) params.formData = formData;

  params.resolveWithFullResponse = resolveWithFullResponse;

  return params;
}

class API {
  constructor({ url = 'https://gitlab.com', token, oauthToken }) {
    this.url = `${url}/api/v4/`;
    this.headers = {};

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
    this.labels = new Labels(this);
    this.runners = new Runners(this);
  }

  get(endpoint, options, fullResponse) {
    return Request.get(defaultRequest(this.url, endpoint, {
      headers: this.headers,
      qs: options,
      resolveWithFullResponse: fullResponse,
    }));
  }

  post(endpoint, options) {
    return Request.post(defaultRequest(this.url, endpoint, {
      headers: this.headers,
      body: options,
    }));
  }

  postForm(endpoint, options) {
    return Request.post(defaultRequest(this.url, endpoint, {
      headers: this.headers,
      formData: options,
    }));
  }

  put(endpoint, options) {
    return Request.put(defaultRequest(this.url, endpoint, {
      headers: this.headers,
      body: options,
    }));
  }

  delete(endpoint, options) {
    return Request.delete(defaultRequest(this.url, endpoint, {
      headers: this.headers,
      qs: options,
    }));
  }
}


module.exports = API;

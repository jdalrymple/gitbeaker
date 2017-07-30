const Request = require('request-promise');

const { Groups, Projects, Issues, Runners, Users, Labels } = require('./Models');

function defaultRequestWithQS(url, endpoint, headers, options) {
  return {
    url: url + endpoint,
    headers,
    json: true,
    qs: options,
  };
}

function defaultRequestWithBody(url, endpoint, headers, options) {
  return {
    url: url + endpoint,
    headers,
    json: true,
    body: options,
  };
}

function defaultRequestWithFormData(url, endpoint, headers, options) {
  return {
    url: url + endpoint,
    headers,
    json: true,
    formData: options,
  };
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

  get(endpoint, options) {
    return Request.get(defaultRequestWithQS(this.url, endpoint, this.headers, options));
  }

  post(endpoint, options) {
    return Request.post(defaultRequestWithBody(this.url, endpoint, this.headers, options));
  }

  postForm(endpoint, options) {
    const formHeader = Object.assign(this.headers, {
      'content-type': 'multipart/form-data',
    });

    return Request.post(defaultRequestWithFormData(this.url, endpoint, formHeader, options));
  }

  put(endpoint, options) {
    return Request.put(defaultRequestWithBody(this.url, endpoint, this.headers, options));
  }

  delete(endpoint, options) {
    return Request.delete(defaultRequestWithQS(this.url, endpoint, this.headers, options));
  }
}

module.exports = API;

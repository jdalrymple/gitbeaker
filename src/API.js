const Request = require('request-promise');
const { Groups, Projects, Issues, Users, Labels } = require('./Models');

class API {
  constructor({ url = 'https://gitlab.com', token, oauthToken }) {
    this.url = `${url}/api/v4/`;
    this.headers = {}

    if (oauthToken) {
      this.headers.Authorization = `Bearer ${oauthToken}`;
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw "`token` (private-token) or `oauth_token` is mandatory"
    }

    this.groups = new Groups(this);
    this.projects = new Projects(this);
    this.issues = new Issues(this);
    this.users = new Users(this);
    this.labels = new Labels(this);
  }

  get(endpoint, options) {
    return Request.get({
      url: this.url + endpoint,
      headers: this.headers,
      json: true,
      qs: options
    });
  }

  post(endpoint, options) {
    console.log(endpoint);
    return Request.post({
      url: this.url + endpoint,
      headers: this.headers,
      json: true,
      body: options
    });
  }

  put(endpoint, options) {
    return Request.put({
      url: this.url + endpoint,
      headers: this.headers,
      json: true,
      body: options
    });
  }

  delete(endpoint, options) {
    return Request.delete({
      url: this.url + endpoint,
      headers: this.headers,
      qs: options,
      json: true,
    });
  }
}

module.exports = API;
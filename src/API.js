const Request = require('request-promise');
const { Groups, Projects, Issues, Runners, Users, Labels } = require('./Models');
const { defaultPaging } = require('./Utils');

function defaultRequest(url, endpoint, { headers, body, qs, formData }) {
  const params = {
    url: `${url}${endpoint}`,
    headers,
    json: true,
  };

  if (body) params.body = body;
  if (qs) params.qs = qs;
  if (formData) params.formData = formData;

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

  get(endpoint, options) {
    return Request.get(defaultRequest(this.url, endpoint, {
      headers: this.headers,
      qs: options,
    }));
  }

  getAndPaginate(endpoint, options) {
    defaultPaging(options);

    const allResults = [];
    options.page = 1;

    // eslint-disable-next-line arrow-body-style
    const getNextPage = () => {
      return this.get(endpoint, options)
        .then((pageResults) => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < pageResults.length; i++) {
            allResults.push(pageResults[i]);
          }

          if (pageResults.length === options.per_page) {
            options.page += 1;

            return getNextPage();
          }

          return allResults;
        });
    };

    return getNextPage();
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

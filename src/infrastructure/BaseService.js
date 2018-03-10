import LinkParser from 'parse-link-header';

async function getAllPages(client, endpoint, options, results = []) {
  const response = await client.get(endpoint, options, true);

  if (!response.headers['x-page']) {
    return response.body;
  }

  const links = LinkParser(response.headers.link);
  const limit = options.max_pages ? response.headers['x-page'] < options.max_pages : true;
  const moreResults = results.concat(response.body);

  if (links.next && limit) {
    return getAllPages(client, links.next.url.replace(client.url, ''), options, moreResults);
  }

  return moreResults;
}

class BaseModel {
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
  }
}

export default BaseModel;

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
  constructor(APIClient) {
    this.client = APIClient;
  }

  get(endpoint, options = {}) {
    if (!options.page) {
      return getAllPages(this.client, endpoint, options);
    }

    return this.client.get(endpoint, options);
  }

  post(endpoint, options = {}) {
    return this.client.post(endpoint, options);
  }

  postForm(endpoint, options = {}) {
    return this.client.postForm(endpoint, options);
  }

  put(endpoint, options = {}) {
    return this.client.put(endpoint, options);
  }

  delete(endpoint, options = {}) {
    return this.client.delete(endpoint, options);
  }
}

export default BaseModel;

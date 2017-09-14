const LinkParser = require('parse-link-header');

async function getAllPages(client, endpoint, options, results = []) {
  const response = await client.get(endpoint, options, true);
  const links = LinkParser(response.headers.link);

  const moreResults = results.concat(response.body);

  if (links.next) {
    await getAllPages(client, links.next.url.replace(client.url, ''), options, moreResults);
  }

  return moreResults;
}

class BaseModel {
  constructor(APIClient) {
    this.client = APIClient;
  }

  get(endpoint, options) {
    if (!options.page && !options.per_page) {
      console.log('d')
      return getAllPages(this.client, endpoint, options);
    }

    console.log('ddddd')
    console.log(endpoint)
    return this.client.get(endpoint, options);
  }

  post(endpoint, options) {
    return this.client.post(endpoint, options);
  }

  postForm(endpoint, options) {
    return this.client.postForm(endpoint, options);
  }

  put(endpoint, options) {
    return this.client.put(endpoint, options);
  }

  delete(endpoint, options) {
    return this.client.delete(endpoint, options);
  }
}

module.exports = BaseModel;

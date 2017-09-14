class BaseModel {
  constructor(APIClient) {
    this.client = APIClient;
  }

  get(endpoint, options) {
    return this.client.get(endpoint, options);
  }

  getAndPaginate(endpoint, options) {
    return this.client.getAndPaginate(endpoint, options);
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

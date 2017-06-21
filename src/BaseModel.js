class BaseModel {
  constructor(APIClient){
    this.client = APIClient;
  }

  get(endpoint, options){
    return this.client.get(endpoint, options);
  }

  post(endpoint, options){
    return this.client.post(endpoint, options);
  }

  put(endpoint, options){
    return this.client.put(endpoint, options);
  }

  delete(endpoint, options){
    return this.client.delete(endpoint, options);
  }
};

module.exports = BaseModel;

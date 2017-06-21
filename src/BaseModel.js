class BaseModel {
  constructor(APIClient){
    this.client = APIClient;
  }

  get(endpoint, options){
    return this.client.get(endpoint, options);
  }

  post(){
    return this.client.post(arguments);
  }

  put(){
    return this.client.put(arguments);
  }

  delete(){
    return this.client.delete(arguments);
  }
};

module.exports = BaseModel;

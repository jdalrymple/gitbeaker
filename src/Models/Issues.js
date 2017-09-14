const BaseModel = require('./BaseModel');

class Issues extends BaseModel {
  all(options = {}) {
    return this.getAndPaginate('issues', options);
  }
}

module.exports = Issues;

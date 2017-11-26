const BaseModel = require('./BaseModel');

class Issues extends BaseModel {
  all(options = {}) {
    return this.get('issues', options);
  }
}

module.exports = Issues;

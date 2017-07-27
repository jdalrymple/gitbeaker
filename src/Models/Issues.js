const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Issues extends BaseModel {
  all(options = {}) {
    Utils.defaultPaging(options);

    return this.get('issues', options);
  }
}

module.exports = Issues;

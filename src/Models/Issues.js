const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Issues extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get("issues", options);
  }
}


module.exports = Issues;

const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class Issues extends BaseModel {
  all(options = {}) {
    return this.get('issues', options);
  }
}

module.exports = Issues;

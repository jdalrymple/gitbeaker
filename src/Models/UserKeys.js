const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class UserKeys extends BaseModel {
  all(userId) {
    const uId = Utils.parse(userId);

    return this.get(`users/${uId}/keys`);
  }

  add(userId, title, key) {
    const uId = Utils.parse(userId);

    return this.post(`users/${uId}/keys`, {
      title,
      key,
    });
  }
}

module.exports = UserKeys;

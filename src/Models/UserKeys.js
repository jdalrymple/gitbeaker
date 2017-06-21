const BaseModel = require('../BaseModel');

class UserKeys extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(userId) {
    return this.get(`users/${parseInt(userId)}/keys`);
  }

  addKey(userId, title, key) {
    return this.post(`users/${userId}/keys`, {
      title,
      key
    });
  }
}

module.exports = UserKeys;

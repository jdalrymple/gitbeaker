const BaseModel = require('./BaseModel');
const UserKeys = require('./UserKeys');
const Utils = require('../Utils');
const ResourceCustomAttributes = require('./ResourceCustomAttributes');

class Users extends BaseModel {
  constructor(...args) {
    super(...args);

    this.customAttributes = new ResourceCustomAttributes('users', ...args);
    this.keys = UserKeys;
  }

  all(options = {}) {
    return this.get('users', options);
  }

  create(options = {}) {
    return this.post('users', options);
  }

  current() {
    return this.get('user');
  }

  session(email, password) {
    return this.post('session', {
      email,
      password,
    });
  }

  search(emailOrUsername) {
    return this.get('users', {
      search: emailOrUsername,
    });
  }

  show(userId) {
    const uId = Utils.parse(userId);

    return this.get(`users/${uId}`);
  }
}

module.exports = Users;

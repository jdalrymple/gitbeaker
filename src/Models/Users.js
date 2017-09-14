const BaseModel = require('./BaseModel');
const UserKeys = require('./UserKeys');
const Utils = require('../Utils');

class Users extends BaseModel {
  constructor(...args) {
    super(...args);

    this.keys = UserKeys;
  }

  all(options = {}) {
    return this.getAndPaginate('users', options);
  }

  current() {
    return this.get('user');
  }

  show(userId) {
    const uId = Utils.parse(userId);

    return this.get(`users/${uId}`);
  }

  create(options = {}) {
    return this.post('users', options);
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
}

module.exports = Users;

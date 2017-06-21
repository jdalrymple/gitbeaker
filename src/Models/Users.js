const BaseModel = require('../BaseModel');
const UserKeys = require('./UserKeys');

class Users extends BaseModel {
  constructor(...args) {
    super(...args);

    this.keys = UserKeys;
  }

  all(options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get("users", options);
  }

  current() {
    return this.get("user");
  }

  show(userId) {
    return this.get(`users/${parseInt(userId)}`);
  }

  create(options = {}) {
    return this.post("users", options);
  }

  session(email, password) {
    return this.post("session", {
      email,
      password
    });
  }

  search(emailOrUsername) {
    return this.get("users", {
      search: emailOrUsername
    });
  }
}

module.exports = Users;

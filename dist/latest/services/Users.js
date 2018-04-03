"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

var _Events = require("./Events");

class Users extends _infrastructure.BaseService {
  all(options) {
    return _infrastructure.RequestHelper.get(this, 'users', options);
  }

  activities() {
    return _infrastructure.RequestHelper.get(this, 'users/activities');
  }

  block(userId) {
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.post(this, `users/${uId}/block`);
  }

  create(options) {
    return _infrastructure.RequestHelper.post(this, 'users', options);
  }

  current() {
    return _infrastructure.RequestHelper.get(this, 'user');
  }

  events(userId, options) {
    (0, _Events.validateEventOptions)(options.action, options.targetType);
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.get(this, `users/${uId}/events`, options);
  }

  session(email, password) {
    return _infrastructure.RequestHelper.post(this, 'session', {
      email,
      password
    });
  }

  search(emailOrUsername) {
    return _infrastructure.RequestHelper.get(this, 'users', {
      search: emailOrUsername
    });
  }

  show(userId) {
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.get(this, `users/${uId}`);
  }

  remove(userId) {
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.delete(this, `users/${uId}`);
  }

  unblock(userId) {
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.post(this, `users/${uId}/unblock`);
  }

}

var _default = Users;
exports.default = _default;
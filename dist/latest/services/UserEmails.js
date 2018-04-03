"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class UserEmails extends _infrastructure.BaseService {
  all({
    userId
  } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';
    return _infrastructure.RequestHelper.get(this, url);
  }

  add(email, {
    userId
  } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';
    return _infrastructure.RequestHelper.post(this, url, {
      email
    });
  }

  show(emailId) {
    const eId = encodeURIComponent(emailId);
    return _infrastructure.RequestHelper.get(this, `users/emails/${eId}`);
  }

  remove(emailId, {
    userId
  } = {}) {
    const eId = encodeURIComponent(emailId);
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';
    return _infrastructure.RequestHelper.delete(this, `${url}/${eId}`);
  }

}

var _default = UserEmails;
exports.default = _default;
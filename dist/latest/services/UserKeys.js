"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class UserKeys extends _infrastructure.BaseService {
  all({
    userId
  }) {
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys';
    return _infrastructure.RequestHelper.get(this, url);
  }

  create(title, key, {
    userId
  } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys';
    return _infrastructure.RequestHelper.post(this, url, {
      title,
      key
    });
  }

  show(keyId) {
    const kId = encodeURIComponent(keyId);
    return _infrastructure.RequestHelper.get(this, `user/keys/${kId}`);
  }

  remove(keyId, {
    userId
  } = {}) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys';
    return _infrastructure.RequestHelper.delete(this, `${url}/${kId}`);
  }

}

var _default = UserKeys;
exports.default = _default;
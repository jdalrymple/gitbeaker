"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class UserGPGKeys extends _infrastructure.BaseService {
  all({
    userId
  } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';
    return _infrastructure.RequestHelper.get(this, url);
  }

  add(title, key, {
    userId
  } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';
    return _infrastructure.RequestHelper.post(this, url, {
      title,
      key
    });
  }

  show(keyId, {
    userId
  } = {}) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';
    return _infrastructure.RequestHelper.get(this, `${url}/${kId}`);
  }

  remove(keyId, {
    userId
  } = {}) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';
    return _infrastructure.RequestHelper.delete(this, `${url}/${kId}`);
  }

}

var _default = UserGPGKeys;
exports.default = _default;
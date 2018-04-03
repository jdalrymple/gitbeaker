"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class UserImpersonationTokens extends _infrastructure.BaseService {
  all(userId) {
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.get(this, `users/${uId}/impersonation_tokens`);
  }

  add(userId, name, scopes, expiresAt) {
    const uId = encodeURIComponent(userId);
    return _infrastructure.RequestHelper.post(this, `users/${uId}/impersonation_tokens`, {
      name,
      expiresAt,
      scopes
    });
  }

  show(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

  revoke(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

}

var _default = UserImpersonationTokens;
exports.default = _default;
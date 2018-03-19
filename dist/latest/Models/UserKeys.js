"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserKeys extends _BaseModel.default {
  add(userId, title, key) {
    const uId = (0, _Utils.parse)(userId);
    return this.post(`users/${uId}/keys`, {
      title,
      key
    });
  }

  addForCurrentUser(title, key) {
    return this.post('user/keys', {
      title,
      key
    });
  }

  remove(userId, keyId) {
    const uId = (0, _Utils.parse)(userId);
    const kId = (0, _Utils.parse)(keyId);
    return this.delete(`users/${uId}/keys/${kId}`);
  }

  removeForCurrentUser(keyId) {
    const kId = (0, _Utils.parse)(keyId);
    return this.delete(`user/keys/${kId}`);
  }

  all(userId) {
    const uId = (0, _Utils.parse)(userId);
    return this.get(`users/${uId}/keys`);
  }

  allForCurrentUser() {
    return this.get('user/keys');
  }

}

var _default = UserKeys;
exports.default = _default;
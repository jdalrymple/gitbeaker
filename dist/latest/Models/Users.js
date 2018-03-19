"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _UserKeys = _interopRequireDefault(require("./UserKeys"));

var _ResourceCustomAttributes = _interopRequireDefault(require("./ResourceCustomAttributes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Users extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.customAttributes = new _ResourceCustomAttributes.default('users', ...args);
    this.keys = new _UserKeys.default(...args);
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
      password
    });
  }

  search(emailOrUsername) {
    return this.get('users', {
      search: emailOrUsername
    });
  }

  show(userId) {
    const uId = (0, _Utils.parse)(userId);
    return this.get(`users/${uId}`);
  }

}

var _default = Users;
exports.default = _default;
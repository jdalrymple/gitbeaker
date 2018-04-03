"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SystemHooks extends _infrastructure.BaseService {
  all(options) {
    return _infrastructure.RequestHelper.get(this, 'hooks', options);
  }

  show(hookId) {
    const hId = encodeURIComponent(hookId);
    return _infrastructure.RequestHelper.get(this, `hooks/${hId}`);
  }

  add(url, options) {
    return _infrastructure.RequestHelper.post(this, 'hooks', _objectSpread({
      url
    }, options));
  }

  edit(hookId, url, options) {
    const hId = encodeURIComponent(hookId);
    return _infrastructure.RequestHelper.put(this, `hooks/${hId}`, _objectSpread({
      url
    }, options));
  }

  remove(projectId, hookId) {
    const hId = encodeURIComponent(hookId);
    return _infrastructure.RequestHelper.delete(this, `hooks/${hId}`);
  }

}

var _default = SystemHooks;
exports.default = _default;
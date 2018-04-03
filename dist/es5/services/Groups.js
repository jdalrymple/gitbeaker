"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Groups =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Groups, _BaseService);

  function Groups() {
    (0, _classCallCheck2.default)(this, Groups);
    return (0, _possibleConstructorReturn2.default)(this, (Groups.__proto__ || (0, _getPrototypeOf.default)(Groups)).apply(this, arguments));
  }

  (0, _createClass2.default)(Groups, [{
    key: "all",
    value: function all(options) {
      return _infrastructure.RequestHelper.get(this, 'groups', options);
    }
  }, {
    key: "create",
    value: function create(options) {
      return _infrastructure.RequestHelper.post(this, 'groups', options);
    }
  }, {
    key: "remove",
    value: function remove(groupId) {
      var gId = encodeURIComponent(groupId);
      return _infrastructure.RequestHelper.delete(this, "groups/".concat(gId));
    }
  }, {
    key: "search",
    value: function search(nameOrPath) {
      return _infrastructure.RequestHelper.get(this, 'groups', {
        search: nameOrPath
      });
    }
  }, {
    key: "show",
    value: function show(groupId) {
      var gId = encodeURIComponent(groupId);
      return _infrastructure.RequestHelper.get(this, "groups/".concat(gId));
    }
  }, {
    key: "subgroups",
    value: function subgroups(groupId, options) {
      var gId = encodeURIComponent(groupId);
      return _infrastructure.RequestHelper.get(this, "groups/".concat(gId, "/subgroups"), options);
    }
  }]);
  return Groups;
}(_infrastructure.BaseService);

var _default = Groups;
exports.default = _default;
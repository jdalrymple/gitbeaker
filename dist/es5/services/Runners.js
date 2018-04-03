"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Runners =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Runners, _BaseService);

  function Runners() {
    (0, _classCallCheck2.default)(this, Runners);
    return (0, _possibleConstructorReturn2.default)(this, (Runners.__proto__ || (0, _getPrototypeOf.default)(Runners)).apply(this, arguments));
  }

  (0, _createClass2.default)(Runners, [{
    key: "all",
    value: function all() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var projectId = _ref.projectId,
          options = (0, _objectWithoutProperties2.default)(_ref, ["projectId"]);
      var url = projectId ? "projects/".concat(encodeURIComponent(projectId), "/runners") : 'runners/all';
      return _infrastructure.RequestHelper.get(this, url, options);
    }
  }, {
    key: "allOwned",
    value: function allOwned(options) {
      return _infrastructure.RequestHelper.get(this, 'runners', options);
    }
  }, {
    key: "edit",
    value: function edit(runnerId, attributes) {
      var rId = encodeURIComponent(runnerId);
      return _infrastructure.RequestHelper.put(this, "runners/".concat(rId), attributes);
    }
  }, {
    key: "enable",
    value: function enable(projectId, runnerId) {
      var _map = [projectId, runnerId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          rId = _map2[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/runners"), {
        runnerId: rId
      });
    }
  }, {
    key: "disable",
    value: function disable(projectId, runnerId) {
      var _map3 = [projectId, runnerId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          rId = _map4[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/runners/").concat(rId));
    }
  }, {
    key: "jobs",
    value: function jobs(runnerId) {
      var rId = encodeURIComponent(runnerId);
      return _infrastructure.RequestHelper.get(this, "runners/".concat(rId, "/jobs"));
    }
  }, {
    key: "remove",
    value: function remove(runnerId) {
      var rId = encodeURIComponent(runnerId);
      return _infrastructure.RequestHelper.delete(this, "runners/".concat(rId));
    }
  }, {
    key: "show",
    value: function show(runnerId) {
      var rId = encodeURIComponent(runnerId);
      return _infrastructure.RequestHelper.get(this, "runners/".concat(rId));
    }
  }]);
  return Runners;
}(_infrastructure.BaseService);

var _default = Runners;
exports.default = _default;
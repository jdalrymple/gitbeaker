"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var Triggers =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Triggers, _BaseService);

  function Triggers() {
    (0, _classCallCheck2.default)(this, Triggers);
    return (0, _possibleConstructorReturn2.default)(this, (Triggers.__proto__ || (0, _getPrototypeOf.default)(Triggers)).apply(this, arguments));
  }

  (0, _createClass2.default)(Triggers, [{
    key: "add",
    value: function add(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/triggers"), options);
    }
  }, {
    key: "all",
    value: function all(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/triggers"));
    }
  }, {
    key: "edit",
    value: function edit(projectId, triggerId, options) {
      var _map = [projectId, triggerId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          tId = _map2[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/triggers/").concat(tId), options);
    }
  }, {
    key: "remove",
    value: function remove(projectId, triggerId) {
      var _map3 = [projectId, triggerId].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          tId = _map4[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/triggers/").concat(tId));
    }
  }, {
    key: "show",
    value: function show(projectId, triggerId) {
      var _map5 = [projectId, triggerId].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          tId = _map6[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/triggers/").concat(tId));
    }
  }]);
  return Triggers;
}(_infrastructure.BaseService);

var _default = Triggers;
exports.default = _default;
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

var DeployKeys =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(DeployKeys, _BaseService);

  function DeployKeys() {
    (0, _classCallCheck2.default)(this, DeployKeys);
    return (0, _possibleConstructorReturn2.default)(this, (DeployKeys.__proto__ || (0, _getPrototypeOf.default)(DeployKeys)).apply(this, arguments));
  }

  (0, _createClass2.default)(DeployKeys, [{
    key: "add",
    value: function add(projectId, options) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/deploy_keys"), options);
    }
  }, {
    key: "all",
    value: function all(projectId) {
      var pId = encodeURIComponent(projectId);
      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/deploy_keys"));
    }
  }, {
    key: "show",
    value: function show(projectId, keyId) {
      var _map = [projectId, keyId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          kId = _map2[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/deploy_keys/").concat(kId));
    }
  }]);
  return DeployKeys;
}(_infrastructure.BaseService);

var _default = DeployKeys;
exports.default = _default;
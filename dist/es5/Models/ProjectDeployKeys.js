"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var ProjectDeployKeys =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectDeployKeys, _BaseModel);

  function ProjectDeployKeys() {
    (0, _classCallCheck2.default)(this, ProjectDeployKeys);
    return (0, _possibleConstructorReturn2.default)(this, (ProjectDeployKeys.__proto__ || (0, _getPrototypeOf.default)(ProjectDeployKeys)).apply(this, arguments));
  }

  (0, _createClass2.default)(ProjectDeployKeys, [{
    key: "add",
    value: function add(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/deploy_keys"), options);
    }
  }, {
    key: "all",
    value: function all(projectId) {
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/deploy_keys"));
    }
  }, {
    key: "show",
    value: function show(projectId, keyId) {
      var _map = [projectId, keyId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          kId = _map2[1];

      return this.get("projects/".concat(pId, "/deploy_keys/").concat(kId));
    }
  }]);
  return ProjectDeployKeys;
}(_BaseModel2.default);

var _default = ProjectDeployKeys;
exports.default = _default;
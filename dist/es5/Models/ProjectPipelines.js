"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var Pipelines =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Pipelines, _BaseModel);

  function Pipelines() {
    (0, _classCallCheck2.default)(this, Pipelines);
    return (0, _possibleConstructorReturn2.default)(this, (Pipelines.__proto__ || (0, _getPrototypeOf.default)(Pipelines)).apply(this, arguments));
  }

  (0, _createClass2.default)(Pipelines, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/pipelines"), options);
    }
  }]);
  return Pipelines;
}(_BaseModel2.default);

var _default = Pipelines;
exports.default = _default;
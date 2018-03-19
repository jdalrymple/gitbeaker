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

var Issues =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(Issues, _BaseModel);

  function Issues() {
    (0, _classCallCheck2.default)(this, Issues);
    return (0, _possibleConstructorReturn2.default)(this, (Issues.__proto__ || (0, _getPrototypeOf.default)(Issues)).apply(this, arguments));
  }

  (0, _createClass2.default)(Issues, [{
    key: "all",
    value: function all() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.get('issues', options);
    }
  }]);
  return Issues;
}(_BaseModel2.default);

var _default = Issues;
exports.default = _default;
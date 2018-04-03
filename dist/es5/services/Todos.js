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

var Todos =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(Todos, _BaseService);

  function Todos() {
    (0, _classCallCheck2.default)(this, Todos);
    return (0, _possibleConstructorReturn2.default)(this, (Todos.__proto__ || (0, _getPrototypeOf.default)(Todos)).apply(this, arguments));
  }

  (0, _createClass2.default)(Todos, [{
    key: "all",
    value: function all(options) {
      return _infrastructure.RequestHelper.get(this, 'todos', options);
    }
  }, {
    key: "create",
    value: function create(projectId, mergerequestId) {
      var _map = [projectId, mergerequestId].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          mId = _map2[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/merge_requests/").concat(mId, "/todo"));
    }
  }, {
    key: "done",
    value: function done() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          todoId = _ref.todoId;

      var tId = encodeURIComponent(todoId);
      return _infrastructure.RequestHelper.delete(this, "todos/".concat(tId, "/mark_as_done"));
    }
  }]);
  return Todos;
}(_infrastructure.BaseService);

var _default = Todos;
exports.default = _default;
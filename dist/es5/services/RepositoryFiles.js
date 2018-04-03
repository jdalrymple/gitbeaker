"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _infrastructure = require("../infrastructure");

var RepositoryFiles =
/*#__PURE__*/
function (_BaseService) {
  (0, _inherits2.default)(RepositoryFiles, _BaseService);

  function RepositoryFiles() {
    (0, _classCallCheck2.default)(this, RepositoryFiles);
    return (0, _possibleConstructorReturn2.default)(this, (RepositoryFiles.__proto__ || (0, _getPrototypeOf.default)(RepositoryFiles)).apply(this, arguments));
  }

  (0, _createClass2.default)(RepositoryFiles, [{
    key: "create",
    value: function create(projectId, filePath, branch, options) {
      var _map = [projectId, filePath].map(encodeURIComponent),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          path = _map2[1];

      return _infrastructure.RequestHelper.post(this, "projects/".concat(pId, "/repository/files/").concat(path), (0, _objectSpread2.default)({
        branch: branch
      }, options));
    }
  }, {
    key: "edit",
    value: function edit(projectId, filePath, branch, options) {
      var _map3 = [projectId, filePath].map(encodeURIComponent),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          path = _map4[1];

      return _infrastructure.RequestHelper.put(this, "projects/".concat(pId, "/repository/files/").concat(path), (0, _objectSpread2.default)({
        branch: branch
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, filePath, branch, options) {
      var _map5 = [projectId, filePath].map(encodeURIComponent),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          pId = _map6[0],
          path = _map6[1];

      return _infrastructure.RequestHelper.delete(this, "projects/".concat(pId, "/repository/files/").concat(path), (0, _objectSpread2.default)({
        branch: branch
      }, options));
    }
  }, {
    key: "show",
    value: function show(projectId, filePath, ref) {
      var _map7 = [projectId, filePath].map(encodeURIComponent),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          pId = _map8[0],
          path = _map8[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/files/").concat(path), {
        ref: ref
      });
    }
  }, {
    key: "showRaw",
    value: function showRaw(projectId, filePath, ref) {
      var _map9 = [projectId, filePath].map(encodeURIComponent),
          _map10 = (0, _slicedToArray2.default)(_map9, 2),
          pId = _map10[0],
          path = _map10[1];

      return _infrastructure.RequestHelper.get(this, "projects/".concat(pId, "/repository/files/").concat(path, "/raw"), {
        ref: ref
      });
    }
  }]);
  return RepositoryFiles;
}(_infrastructure.BaseService);

var _default = RepositoryFiles;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("babel-runtime/core-js/object/assign"));

var _slicedToArray2 = _interopRequireDefault(require("babel-runtime/helpers/slicedToArray"));

var _getPrototypeOf = _interopRequireDefault(require("babel-runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("babel-runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("babel-runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("babel-runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("babel-runtime/helpers/inherits"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ResourceNotes = _interopRequireDefault(require("./ResourceNotes"));

var ProjectIssues =
/*#__PURE__*/
function (_BaseModel) {
  (0, _inherits2.default)(ProjectIssues, _BaseModel);

  function ProjectIssues() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, ProjectIssues);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ProjectIssues.__proto__ || (0, _getPrototypeOf.default)(ProjectIssues)).call.apply(_ref, [this].concat(args)));
    _this.notes = new (Function.prototype.bind.apply(_ResourceNotes.default, [null].concat(['projects', 'issues'], args)))();
    return _this;
  }

  (0, _createClass2.default)(ProjectIssues, [{
    key: "all",
    value: function all(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.get("projects/".concat(pId, "/issues"), options);
    }
  }, {
    key: "create",
    value: function create(projectId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pId = (0, _Utils.parse)(projectId);
      return this.post("projects/".concat(pId, "/issues"), options);
    }
  }, {
    key: "edit",
    value: function edit(projectId, issueId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map = [projectId, issueId].map(_Utils.parse),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          pId = _map2[0],
          iId = _map2[1];

      return this.put("projects/".concat(pId, "/issues/").concat(iId), options);
    }
  }, {
    key: "link",
    value: function link(projectId, issueIId, targetProjectId, targetIssueId) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var _map3 = [projectId, issueIId].map(_Utils.parse),
          _map4 = (0, _slicedToArray2.default)(_map3, 2),
          pId = _map4[0],
          iId = _map4[1];

      var _map5 = [targetProjectId, targetIssueId].map(_Utils.parse),
          _map6 = (0, _slicedToArray2.default)(_map5, 2),
          targetpId = _map6[0],
          targetIId = _map6[1];

      return this.post("projects/".concat(pId, "/issues/").concat(iId, "/links"), (0, _assign.default)({
        target_project_id: targetpId,
        target_issue_id: targetIId
      }, options));
    }
  }, {
    key: "remove",
    value: function remove(projectId, issueId) {
      var _map7 = [projectId, issueId].map(_Utils.parse),
          _map8 = (0, _slicedToArray2.default)(_map7, 2),
          pId = _map8[0],
          iId = _map8[1];

      return this.delete("projects/".concat(pId, "/issues/").concat(iId));
    }
  }, {
    key: "show",
    value: function show(projectId, issueId) {
      var _map9 = [projectId, issueId].map(_Utils.parse),
          _map10 = (0, _slicedToArray2.default)(_map9, 2),
          pId = _map10[0],
          iId = _map10[1];

      return this.get("projects/".concat(pId, "/issues/").concat(iId));
    }
  }, {
    key: "subscribe",
    value: function subscribe(projectId, issueId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _map11 = [projectId, issueId].map(_Utils.parse),
          _map12 = (0, _slicedToArray2.default)(_map11, 2),
          pId = _map12[0],
          iId = _map12[1];

      return this.post("projects/".concat(pId, "/issues/").concat(iId, "/subscribe"), options);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(projectId, issueId) {
      var _map13 = [projectId, issueId].map(_Utils.parse),
          _map14 = (0, _slicedToArray2.default)(_map13, 2),
          pId = _map14[0],
          iId = _map14[1];

      return this.delete("projects/".concat(pId, "/issues/").concat(iId, "/unsubscribe"));
    }
  }]);
  return ProjectIssues;
}(_BaseModel2.default);

var _default = ProjectIssues;
exports.default = _default;
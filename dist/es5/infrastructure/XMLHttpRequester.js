"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errors = require("request-promise-core/errors");

var _util = _interopRequireDefault(require("util.promisify"));

var _xhr = _interopRequireDefault(require("xhr"));

var promisifyFn = function promisifyFn(fn) {
  var promisifiedFn = (0, _util.default)(fn);
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(opts) {
        var response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return promisifiedFn(opts);

              case 2:
                response = _context.sent;

                if (!(response.statusCode >= 400 && response.statusCode <= 599)) {
                  _context.next = 5;
                  break;
                }

                throw new _errors.StatusCodeError(response.statusCode, response.body, {}, null);

              case 5:
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

var XMLHttpRequester = promisifyFn(_xhr.default);
XMLHttpRequester.del = promisifyFn(_xhr.default.del);
XMLHttpRequester.delete = XMLHttpRequester.del;
XMLHttpRequester.get = promisifyFn(_xhr.default.get);
XMLHttpRequester.head = promisifyFn(_xhr.default.head);
XMLHttpRequester.patch = promisifyFn(_xhr.default.patch);
XMLHttpRequester.post = promisifyFn(_xhr.default.post);
XMLHttpRequester.put = promisifyFn(_xhr.default.put);
var _default = XMLHttpRequester;
exports.default = _default;
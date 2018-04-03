"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Todos extends _infrastructure.BaseService {
  all(options) {
    return _infrastructure.RequestHelper.get(this, 'todos', options);
  }

  create(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/todo`);
  }

  done({
    todoId
  } = {}) {
    const tId = encodeURIComponent(todoId);
    return _infrastructure.RequestHelper.delete(this, `todos/${tId}/mark_as_done`);
  }

}

var _default = Todos;
exports.default = _default;
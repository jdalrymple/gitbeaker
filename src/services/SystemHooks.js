import { BaseService, RequestHelper } from '../infrastructure';

class SystemHooks extends BaseService {
  all(options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `hooks`, options);
  }

  show(hookId) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.get(this, `hooks/${hId}`);
  }

  add(url, options = {}) {
    return RequestHelper.post(
      this,
      `hooks`,
      Object.assign({ url }, options),
    );
  }

  edit(hookId, url, options = {}) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put(
      this,
      `hooks/${hId}`,
      Object.assign({ url }, options),
    );
  }

  remove(projectId, hookId) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.delete(this, `hooks/${hId}`);
  }
}

export default SystemHooks;

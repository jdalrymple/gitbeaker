import { BaseService, RequestHelper } from '../infrastructure';

class SystemHooks extends BaseService {
  add(url, options) {
    return RequestHelper.post(this, 'hooks', { url, ...options });
  }

  all(options) {
    return RequestHelper.get(this, 'hooks', options);
  }

  edit(hookId, url, options) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put(this, `hooks/${hId}`, { url, ...options });
  }

  remove(projectId, hookId) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.delete(this, `hooks/${hId}`);
  }
}

export default SystemHooks;

import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class SystemHooks extends BaseService {
  @api('<url>', { options: true, method: 'POST' })
  add(url, options) {
    return RequestHelper.post(this, 'hooks', { url, ...options });
  }

  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'hooks', options);
  }

  @api('<hookId>', '<url>', { options: true, method: 'PUT' })
  edit(hookId, url, options) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put(this, `hooks/${hId}`, { url, ...options });
  }

  @api('<projectId>', '<hookId>', { method: 'DELETE' })
  remove(projectId, hookId) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.delete(this, `hooks/${hId}`);
  }
}

export default SystemHooks;

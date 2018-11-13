import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, HookId } from '@src/types';

class SystemHooks extends BaseService {
  add(url: string, options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'hooks', { url, ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'hooks', options);
  }

  edit(hookId: HookId, url: string, options?: BaseRequestOptions) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put(this, `hooks/${hId}`, { url, ...options });
  }

  remove(hookId: HookId, options?: Sudo) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.delete(this, `hooks/${hId}`, options);
  }
}

export default SystemHooks;

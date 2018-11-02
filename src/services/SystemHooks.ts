import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type HookId = string | number;
class SystemHooks extends BaseService {
  add(url: string, options: RequestOptions) {
    return RequestHelper.post(this, 'hooks', { url, ...options });
  }

  all(options: RequestOptions) {
    return RequestHelper.get(this, 'hooks', options);
  }

  edit(hookId: HookId, url: string, options: RequestOptions) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put(this, `hooks/${hId}`, { url, ...options });
  }

  remove(
    // @ts-ignore 'projectId' is declared but its value is never read
    projectId: ProjectId,
    hookId: HookId,
  ) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.delete(this, `hooks/${hId}`);
  }
}

export default SystemHooks;

import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class SystemHooks extends BaseService {
  add(url: string, options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'hooks', { url, ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'hooks', options);
  }

  edit(hookId: number, url: string, options?: BaseRequestOptions) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put(this, `hooks/${hId}`, { url, ...options });
  }

  remove(hookId: number, options?: Sudo) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.del(this, `hooks/${hId}`, options);
  }
}

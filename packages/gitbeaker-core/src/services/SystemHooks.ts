import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class SystemHooks<C extends boolean = false> extends BaseService<C> {
  add(url: string, options?: BaseRequestOptions) {
    return RequestHelper.post<C>(this, 'hooks', { url, ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<C>(this, 'hooks', options);
  }

  edit(hookId: number, url: string, options?: BaseRequestOptions) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.put<C>(this, `hooks/${hId}`, { url, ...options });
  }

  remove(hookId: number, options?: Sudo) {
    const hId = encodeURIComponent(hookId);

    return RequestHelper.del<C>(this, `hooks/${hId}`, options);
  }
}

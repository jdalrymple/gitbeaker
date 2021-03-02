import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export class ApplicationSettings<C extends boolean = false> extends BaseService<C> {
  all(options?: Sudo) {
    return RequestHelper.get<Record<string, unknown>[]>()(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions) {
    return RequestHelper.put()(this, 'application/settings', options);
  }
}

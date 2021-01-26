import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export class ApplicationSettings<C extends boolean = false> extends BaseService<C> {
  all(options?: Sudo) {
    return RequestHelper.get<C>(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions) {
    return RequestHelper.put<C>(this, 'application/settings', options);
  }
}

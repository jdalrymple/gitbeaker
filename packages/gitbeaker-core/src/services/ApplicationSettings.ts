import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export class ApplicationSettings extends BaseService {
  all(options?: Sudo) {
    return RequestHelper.get(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions) {
    return RequestHelper.put(this, 'application/settings', options);
  }
}

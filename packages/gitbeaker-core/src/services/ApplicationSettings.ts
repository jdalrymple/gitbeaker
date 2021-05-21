import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';
import { SettingsSchema } from '../models';

export class ApplicationSettings<C extends boolean = false> extends BaseService<C> {
  all(options?: Sudo) {
    return RequestHelper.get<SettingsSchema>()(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions) {
    return RequestHelper.put<SettingsSchema>()(this, 'application/settings', options);
  }
}

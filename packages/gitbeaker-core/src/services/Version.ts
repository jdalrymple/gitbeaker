import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Version<C extends boolean = false> extends BaseService<C> {
  show(options?: Sudo) {
    return RequestHelper.get()(this, 'version', options);
  }
}

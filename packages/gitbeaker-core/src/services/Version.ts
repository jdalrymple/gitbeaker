import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Version<C extends boolean> extends BaseService<C> {
  show(options?: Sudo) {
    return RequestHelper.get<C>(this, 'version', options);
  }
}

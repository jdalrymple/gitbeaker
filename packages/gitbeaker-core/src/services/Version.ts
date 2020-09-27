import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Version extends BaseService {
  show(options?: Sudo) {
    return RequestHelper.get(this, 'version', options);
  }
}

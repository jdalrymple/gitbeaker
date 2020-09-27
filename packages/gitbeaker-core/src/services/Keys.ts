import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Keys extends BaseService {
  show(keyId: string, options?: Sudo) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `keys/${kId}`, options);
  }
}

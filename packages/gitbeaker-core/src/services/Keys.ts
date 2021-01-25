import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Keys<C extends boolean> extends BaseService<C> {
  show(keyId: string, options?: Sudo) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get<C>(this, `keys/${kId}`, options);
  }
}

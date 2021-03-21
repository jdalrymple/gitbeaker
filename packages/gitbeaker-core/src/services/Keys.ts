import { BaseService } from '@gitbeaker/requester-utils';
import { ExtendedUserSchema } from './Users';
import { RequestHelper, Sudo } from '../infrastructure';

export interface KeySchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  created_at: string;
  expires_at: string;
  user: ExtendedUserSchema;
}

export class Keys<C extends boolean = false> extends BaseService<C> {
  show(keyId: string, options?: Sudo) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get<KeySchema>()(this, `keys/${kId}`, options);
  }
}

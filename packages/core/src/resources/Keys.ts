import { BaseResource } from '@gitbeaker/requester-utils';
import { UserExtendedSchema } from './Users';
import { endpoint, RequestHelper, Sudo } from '../infrastructure';

export interface KeySchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  created_at: string;
  expires_at: string;
  user: UserExtendedSchema;
}

export class Keys<C extends boolean = false> extends BaseResource<C> {
  show(keyId: string, options?: Sudo) {
    return RequestHelper.get<KeySchema>()(this, endpoint`keys/${keyId}`, options);
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export interface VersionSchema extends Record<string, unknown> {
  version: string;
  revision: string;
}

export class Version<C extends boolean = false> extends BaseResource<C> {
  show(options?: Sudo) {
    return RequestHelper.get<VersionSchema>()(this, 'version', options);
  }
}

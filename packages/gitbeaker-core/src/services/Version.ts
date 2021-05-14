import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

interface VersionSchema extends Record<string, unknown> {
  version: string;
  revision: string;
}

export class Version<C extends boolean = false> extends BaseService<C> {
  show(options?: Sudo) {
    return RequestHelper.get<VersionSchema>()(this, 'version', options);
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface VersionSchema extends Record<string, unknown> {
  version: string;
  revision: string;
}

export class Version<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VersionSchema, C, E, void>> {
    return RequestHelper.get<VersionSchema>()(this, 'version', options);
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface MetadataSchema extends Record<string, unknown> {
  version: string;
  revision: string;
  kas: {
    enabled: boolean;
    externalUrl: string;
    version: string;
  };
  enterprise: boolean;
}

export class Metadata<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetadataSchema, C, E, void>> {
    return RequestHelper.get<MetadataSchema>()(this, 'metadata', options);
  }
}

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

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
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetadataSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MetadataSchema>()(this, 'metadata', {
      sudo,
      showExpanded,
    });
  }
}

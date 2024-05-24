import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface GitlabPagesSettingsSchema extends Record<string, unknown> {
  url: string;
  is_unique_domain_enabled: boolean;
  force_https: boolean;
  deployments: Array<{
    created_at: string;
    url: string;
    path_prefix: string;
    root_directory: string;
  }>;
}

export class GitlabPages<C extends boolean = false> extends BaseResource<C> {
  remove<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/pages`, options);
  }

  showSettings<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GitlabPagesSettingsSchema, C, E, void>> {
    return RequestHelper.get<GitlabPagesSettingsSchema>()(
      this,
      endpoint`projects/${projectId}/pages`,
      options,
    );
  }
}

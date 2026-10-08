import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export type ProjectTemplateType =
  | 'dockerfiles'
  | 'gitignores'
  | 'gitlab_ci_ymls'
  | 'licenses'
  | 'issues'
  | 'merge_requests';

export interface ProjectTemplateListSchema extends Record<string, unknown> {
  key: string;
  name: string;
}

export interface ProjectTemplateSchema extends Record<string, unknown> {
  name: string;
  content: string;
  // License-specific fields
  key?: string;
  nickname?: string;
  popular?: boolean;
  html_url?: string;
  source_url?: string;
  description?: string;
  conditions?: string[];
  permissions?: string[];
  limitations?: string[];
}

export class ProjectTemplates<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    type: ProjectTemplateType,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectTemplateListSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProjectTemplateListSchema[]>()(
      this,
      endpoint`projects/${projectId}/templates/${type}`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    type: ProjectTemplateType,
    name: string,
    options?: {
      project?: string;
      fullname?: string;
      sourceTemplateProjectId?: number;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectTemplateSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ProjectTemplateSchema>()(
      this,
      endpoint`projects/${projectId}/templates/${type}/${name}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }
}

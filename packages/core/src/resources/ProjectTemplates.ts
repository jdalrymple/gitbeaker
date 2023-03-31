import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export type ProjectTemplateType =
  | 'dockerfiles'
  | 'gitignores'
  | 'gitlab_ci_ymls'
  | 'licenses'
  | 'issues'
  | 'merge_requests';
export interface ProjectTemplateSchema extends Record<string, unknown> {
  name: string;
  content: string;
}

export class ProjectTemplates<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    type: ProjectTemplateType,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectTemplateSchema[], C, E, P>> {
    return RequestHelper.get<ProjectTemplateSchema[]>()(
      this,
      endpoint`projects/${projectId}/templates/${type}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    type: ProjectTemplateType,
    name: string,
    options?: { project?: string; fullname?: string; sourceTemplateProjectId?: number } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectTemplateSchema, C, E, void>> {
    return RequestHelper.get<ProjectTemplateSchema>()(
      this,
      endpoint`projects/${projectId}/templates/${type}/${name}`,
      options,
    );
  }
}

import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface ProjectHookSchema extends Record<string, unknown> {
  id: number;
  url: string;
  project_id: number;
  push_events: boolean;
  push_events_branch_filter: string;
  issues_events: boolean;
  confidential_issues_events: boolean;
  merge_requests_events: boolean;
  tag_push_events: boolean;
  note_events: boolean;
  confidential_note_events: boolean;
  job_events: boolean;
  pipeline_events: boolean;
  wiki_page_events: boolean;
  deployment_events: boolean;
  releases_events: boolean;
  enable_ssl_verification: boolean;
  created_at: string;
}

export class ProjectHooks<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ProjectHookSchema[]>()(this, `projects/${pId}/hooks`, options);
  }

  show(projectId: string | number, hookId: number, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get<ProjectHookSchema>()(this, `projects/${pId}/hooks/${hId}`, options);
  }

  add(projectId: string | number, url: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProjectHookSchema>()(this, `projects/${pId}/hooks`, {
      url,
      ...options,
    });
  }

  edit(projectId: string | number, hookId: number, url: string, options?: BaseRequestOptions) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put<ProjectHookSchema>()(this, `projects/${pId}/hooks/${hId}`, {
      url,
      ...options,
    });
  }

  remove(projectId: string | number, hookId: number, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/hooks/${hId}`, options);
  }
}

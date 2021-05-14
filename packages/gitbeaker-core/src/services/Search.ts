import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions } from '../infrastructure';

export interface SearchResultSchema extends Record<string, unknown> {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  default_branch: string;
  tag_list?: string[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  avatar_url?: string;
  star_count: number;
  forks_count: number;
  last_activity_at: string;
}

export class Search<C extends boolean = false> extends BaseService<C> {
  all(
    scope: string,
    search: string,
    {
      projectId,
      groupId,
      ...options
    }: { projectId?: string | number; groupId?: string | number } & BaseRequestOptions = {},
  ) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get<SearchResultSchema[]>()(this, `${url}search`, {
      scope,
      search,
      ...options,
    });
  }
}

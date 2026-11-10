import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface GitLabDuoChatContextItem {
  category: 'file' | 'merge_request' | 'issue' | 'snippet';
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface GitLabDuoChatCompletionOptions {
  content: string;
  resource_type?: string;
  resource_id?: string | number;
  referer_url?: string;
  client_subscription_id?: string;
  with_clean_history?: boolean;
  project_id?: number;
  additional_context?: GitLabDuoChatContextItem[];
}

export class GitLabDuoChat<C extends boolean = false> extends BaseResource<C> {
  completions<E extends boolean = false>(
    options: GitLabDuoChatCompletionOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<string>()(this, 'chat/completions', {
      sudo,
      showExpanded,
      body,
    });
  }
}

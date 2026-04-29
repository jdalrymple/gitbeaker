import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface PushRuleSchema extends Record<string, unknown> {
  id: number;
  commit_message_regex: string;
  commit_message_negative_regex: string;
  branch_name_regex: string;
  deny_delete_tag: boolean;
  created_at: string;
  member_check: boolean;
  prevent_secrets: boolean;
  author_email_regex: string;
  file_name_regex: string;
  max_file_size: number;
  commit_committer_check?: boolean;
  reject_unsigned_commits?: boolean;
}

export interface CreateAndEditPushRuleOptions {
  denyDeleteTag?: boolean;
  memberCheck?: boolean;
  preventSecrets?: boolean;
  commitMessageRegex?: string;
  commitMessageNegativeRegex?: string;
  branchNameRegex?: string;
  authorEmailRegex?: string;
  fileNameRegex?: string;
  maxFileSize?: number;
  commitCommitterCheck?: boolean;
  rejectUnsignedCommits?: boolean;
}

export class ResourcePushRules<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    options?: CreateAndEditPushRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PushRuleSchema>()(this, endpoint`${resourceId}/push_rule`, {
      sudo,
      showExpanded,
      body,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    options?: CreateAndEditPushRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PushRuleSchema>()(this, endpoint`${resourceId}/push_rule`, {
      sudo,
      showExpanded,
      body,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/push_rule`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PushRuleSchema>()(this, endpoint`${resourceId}/push_rule`, {
      sudo,
      showExpanded,
    });
  }
}

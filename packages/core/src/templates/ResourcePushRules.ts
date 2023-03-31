import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
}

export class ResourcePushRules<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>> {
    return RequestHelper.post<PushRuleSchema>()(this, endpoint`${resourceId}/push_rule`, options);
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>> {
    return RequestHelper.put<PushRuleSchema>()(this, endpoint`${resourceId}/push_rule`, options);
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/push_rule`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>> {
    return RequestHelper.get<PushRuleSchema>()(this, endpoint`${resourceId}/push_rule`, options);
  }
}

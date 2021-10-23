import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions, Sudo, endpoint } from '../infrastructure';

export interface PushRulesSchema extends Record<string, unknown> {
  id: number;
  project_id: number;
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

export class PushRules<C extends boolean = false> extends BaseResource<C> {
  create(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<PushRulesSchema>()(
      this,
      endpoint`projects/${projectId}/push_rule`,
      options,
    );
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.put<PushRulesSchema>()(
      this,
      endpoint`projects/${projectId}/push_rule`,
      options,
    );
  }

  remove(projectId: string | number, options?: Sudo) {
    return RequestHelper.del<PushRulesSchema>()(
      this,
      endpoint`projects/${projectId}/push_rule`,
      options,
    );
  }

  show(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<PushRulesSchema>()(
      this,
      endpoint`projects/${projectId}/push_rule`,
      options,
    );
  }
}

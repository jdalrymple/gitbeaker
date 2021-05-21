import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';

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

export class PushRules extends BaseService {
  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PushRulesSchema>()(this, `projects/${pId}/push_rule`, options);
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put<PushRulesSchema>()(this, `projects/${pId}/push_rule`, options);
  }

  remove(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del<PushRulesSchema>()(this, `projects/${pId}/push_rule`, options);
  }

  show(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PushRulesSchema>()(this, `projects/${pId}/push_rule`, options);
  }
}

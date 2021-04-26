import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { CommitSchema } from './Commits';
import { MilestoneSchema } from '../templates/ResourceMilestones';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface EvidenceSchema {
  sha: string;
  filepath: string;
  collected_at: string;
}

export interface SourceSchema {
  format: string;
  url: string;
}

export interface LinkSchema {
  id: number;
  name: string;
  url: string;
  external: boolean;
  link_type: string;
}

export interface ReleaseSchema extends Record<string, unknown> {
  tag_name: string;
  description: string;
  name: string;
  description_html: string;
  created_at: string;
  released_at: string;
  user: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
  commit: CommitSchema;
  milestones?: MilestoneSchema[];
  commit_path: string;
  tag_path: string;
  assets: {
    count: number;
    sources?: SourceSchema[];
    links?: LinkSchema[];
    evidence_file_path: string;
  };
  evidences?: EvidenceSchema[];
}

// TODO: Add missing functions
export class Releases<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ReleaseSchema[]>()(this, `projects/${pId}/releases`, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ReleaseSchema>()(this, `projects/${pId}/releases`, options);
  }

  edit(projectId: string | number, tagName: string, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.put<ReleaseSchema>()(this, `projects/${pId}/releases/${tId}`, options);
  }

  remove(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/releases/${tId}`, options);
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get<ReleaseSchema>()(this, `projects/${pId}/releases/${tId}`, options);
  }
}

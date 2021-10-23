import { BaseResource } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { CommitSchema } from './Commits';
import { MilestoneSchema } from '../templates/types';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface ReleaseEvidence {
  sha: string;
  filepath: string;
  collected_at: string;
}

export interface ReleaseAssetSource {
  format: string;
  url: string;
}

export interface ReleaseAssetLink {
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
    sources?: ReleaseAssetSource[];
    links?: ReleaseAssetLink[];
    evidence_file_path: string;
  };
  evidences?: ReleaseEvidence[];
}

// TODO: Add missing functions
export class Releases<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<ReleaseSchema[]>()(
      this,
      endpoint`projects/${projectId}/releases`,
      options,
    );
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases`,
      options,
    );
  }

  edit(projectId: string | number, tagName: string, options?: BaseRequestOptions) {
    return RequestHelper.put<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}`,
      options,
    );
  }

  remove(projectId: string | number, tagName: string, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/releases/${tagName}`, options);
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}`,
      options,
    );
  }
}

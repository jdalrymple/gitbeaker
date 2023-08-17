import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { UserSchema } from './Users';
import type { CommitSchema } from './Commits';
import type { MilestoneSchema } from '../templates/ResourceMilestones';

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
  description: string | null;
  name: string | null;
  description_html: string;
  created_at: string;
  released_at: string | null;
  user: MappedOmit<UserSchema, 'created_at'>;
  commit: CommitSchema;
  milestones: MilestoneSchema[] | null;
  commit_path: string;
  tag_path: string;
  assets: {
    count: number;
    sources?: ReleaseAssetSource[] | null;
    links: ReleaseAssetLink[] | null;
    evidence_file_path: string;
  };
  evidences: ReleaseEvidence[] | null;
  _links: {
    closed_issues_url: string;
    closed_merge_requests_url: string;
    edit_url: string;
    merged_merge_requests_url: string;
    opened_issues_url: string;
    opened_merge_requests_url: string;
    self: string;
  };
}

export class ProjectReleases<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema[], C, E, P>> {
    return RequestHelper.get<ReleaseSchema[]>()(
      this,
      endpoint`projects/${projectId}/releases`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    return RequestHelper.post<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases`,
      options,
    );
  }

  createEvidence<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<number, C, E, void>> {
    return RequestHelper.post<number>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/evidence`,
      options,
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    return RequestHelper.put<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}`,
      options,
    );
  }

  download<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    filepath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/downloads/${filepath}`,
      options,
    );
  }

  downloadLatest<E extends boolean = false>(
    projectId: string | number,
    filepath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/releases/permalink/latest/downloads/${filepath}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/releases/${tagName}`, options);
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: { includeHtmlDescription?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}`,
      options,
    );
  }

  showLatest<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/permalink/latest`,
      options,
    );
  }

  showLatestEvidence<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/permalink/latest/evidence`,
      options,
    );
  }
}

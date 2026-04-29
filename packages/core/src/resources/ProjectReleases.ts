import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestBodyRecordOptions,
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { CommitSchema } from './Commits';
import type { SimpleUserSchema } from './Users';

import { RequestHelper, endpoint } from '../infrastructure';

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
  name: string | null;
  tag_name: string;
  description: string | null;
  created_at: string;
  released_at: string | null;
  upcoming_release: boolean | null;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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
    options?: { includeHtmlDescription: true } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ description_html: string } & ReleaseSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { includeHtmlDescription?: boolean } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ReleaseSchema[]>()(this, endpoint`projects/${projectId}/releases`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    options?: BaseRequestBodyRecordOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ReleaseSchema>()(this, endpoint`projects/${projectId}/releases`, {
      sudo,
      showExpanded,
      body,
    });
  }

  createEvidence<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<number, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<number>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/evidence`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: BaseRequestBodyRecordOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  download<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    filepath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/downloads/${filepath}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  downloadLatest<E extends boolean = false>(
    projectId: string | number,
    filepath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/releases/permalink/latest/downloads/${filepath}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/releases/${tagName}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: { includeHtmlDescription?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  showLatest<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/permalink/latest`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showLatestEvidence<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ReleaseSchema>()(
      this,
      endpoint`projects/${projectId}/releases/permalink/latest/evidence`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

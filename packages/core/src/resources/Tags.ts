import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitSchema } from './Commits';
import type { ReleaseSchema } from './ProjectReleases';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface TagSchema extends Record<string, unknown> {
  commit: CommitSchema;
  release: Pick<ReleaseSchema, 'tag_name' | 'description'>;
  name: string;
  target: string;
  message?: string;
  protected: boolean;
  created_at?: string;
}

export interface TagSignatureSchema extends Record<string, unknown> {
  signature_type: string;
  verification_status: string;
  x509_certificate: {
    id: number;
    subject: string;
    subject_key_identifier: string;
    email: string;
    serial_number: number;
    certificate_status: string;
    x509_issuer: {
      id: number;
      subject: string;
      subject_key_identifier: string;
      crl_url: string;
    };
  };
}

export class Tags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: {
      orderBy?: 'name' | 'updated' | 'version';
      sort?: 'asc' | 'desc';
      search?: string;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<TagSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<TagSchema[]>()(this, endpoint`projects/${projectId}/repository/tags`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    ref: string,
    options?: { message?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TagSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TagSchema>()(this, endpoint`projects/${projectId}/repository/tags`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        tagName,
        ref,
      },
    });
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/repository/tags/${tagName}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TagSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<TagSchema>()(
      this,
      endpoint`projects/${projectId}/repository/tags/${tagName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showSignature<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TagSignatureSchema | { message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<TagSignatureSchema | { message: string }>()(
      this,
      endpoint`projects/${projectId}/repository/tags/${tagName}/signature`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

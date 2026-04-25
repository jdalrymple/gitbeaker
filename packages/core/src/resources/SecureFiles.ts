import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export interface SecureFileSchema extends Record<string, unknown> {
  id: number;
  name: string;
  checksum: string;
  checksum_algorithm: string;
  created_at: string;
  expires_at?: string;
  metadata?: {
    id: string;
    issuer: {
      C: string;
      O: string;
      CN: string;
      OU: string;
    };
    subject: {
      C: string;
      O: string;
      CN: string;
      OU: string;
      UID: string;
    };
    expires_at: string;
  };
}

export class SecureFiles<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SecureFileSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SecureFileSchema[]>()(
      this,
      endpoint`projects/${projectId}/secure_files`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    file: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SecureFileSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<SecureFileSchema>()(this, `projects/${projectId}/secure_files`, {
      sudo,
      showExpanded,
      body: createFormData({
        file: [file.content, file.filename],
        name,
      }),
    });
  }

  download<E extends boolean = false>(
    projectId: string | number,
    secureFileId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/secure_files/${secureFileId}/download`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    secureFileId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/secure_files/${secureFileId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    secureFileId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SecureFileSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SecureFileSchema>()(
      this,
      endpoint`projects/${projectId}/secure_files/${secureFileId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

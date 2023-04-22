import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SecureFileSchema[], C, E, P>> {
    return RequestHelper.get<SecureFileSchema[]>()(
      this,
      endpoint`projects/${projectId}/secure_files`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    file: { content: Blob; filename: string },
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SecureFileSchema, C, E, void>> {
    return RequestHelper.post<SecureFileSchema>()(this, `projects/${projectId}/secure_files`, {
      isForm: true,
      ...options,
      file: [file.content, file.filename],
      name,
    });
  }

  download<E extends boolean = false>(
    projectId: string | number,
    secureFileId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/secure_files/${secureFileId}/download`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    secureFileId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/secure_files/${secureFileId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    secureFileId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SecureFileSchema, C, E, void>> {
    return RequestHelper.get<SecureFileSchema>()(
      this,
      endpoint`projects/${projectId}/secure_files/${secureFileId}`,
      options,
    );
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface SSHCertificateSchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  created_at: string;
}

export class GroupSSHCertificates<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SSHCertificateSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SSHCertificateSchema[]>()(
      this,
      endpoint`groups/${groupId}/ssh_certificates`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    key: string,
    title: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SSHCertificateSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<SSHCertificateSchema>()(
      this,
      endpoint`groups/${groupId}/ssh_certificates`,
      {
        sudo,
        showExpanded,
        body: { key, title },
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    certificateId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/ssh_certificates/${certificateId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

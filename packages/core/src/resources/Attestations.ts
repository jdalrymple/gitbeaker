import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface AttestationSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  created_at: string;
  updated_at: string;
  expire_at: string;
  project_id: number;
  build_id: number;
  status: string;
  predicate_kind: string;
  predicate_type: string;
  subject_digest: string;
  download_url: string;
}

export interface SigstoreBundleSchema extends Record<string, unknown> {
  mediaType: string;
  verificationMaterial: {
    certificate: {
      rawBytes: string;
    };
    tlogEntries: unknown[];
  };
}

export class Attestations<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    subjectDigest: string,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AttestationSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<AttestationSchema[]>()(
      this,
      endpoint`projects/${projectId}/attestations/${subjectDigest}`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  download<E extends boolean = false>(
    projectId: string | number,
    attestationIid: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SigstoreBundleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SigstoreBundleSchema>()(
      this,
      endpoint`projects/${projectId}/attestations/${attestationIid}/download`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

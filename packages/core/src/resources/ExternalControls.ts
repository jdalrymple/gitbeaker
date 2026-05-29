import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface ExternalControlStatusSchema extends Record<string, unknown> {
  status: string;
}

export class ExternalControls<C extends boolean = false> extends BaseResource<C> {
  setStatus<E extends boolean = false>(
    projectId: string | number,
    externalControlId: number,
    status: 'pass' | 'fail',
    options?: {
      timestamp: string;
      nonce: string;
      hmacSignature: string;
    } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExternalControlStatusSchema, C, E, void>> {
    const { sudo, showExpanded, timestamp, nonce, hmacSignature } = options || {};

    const headers: Record<string, string> = {};
    
    if (timestamp) headers['X-Gitlab-Timestamp'] = timestamp;
    if (nonce) headers['X-Gitlab-Nonce'] = nonce;
    if (hmacSignature) headers['X-Gitlab-Hmac-Sha256'] = hmacSignature;

    return RequestHelper.patch<ExternalControlStatusSchema>()(
      this,
      endpoint`projects/${projectId}/compliance_external_controls/${externalControlId}/status`,
      {
        sudo,
        showExpanded,
        headers,
        body: {
          status,
        },
      },
    );
  }
}
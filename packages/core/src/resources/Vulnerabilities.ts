import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

import { RequestHelper, endpoint } from '../infrastructure';

export interface VulnerabilitySchema extends Record<string, unknown> {
  id: number;
  title: string;
  description?: string;
  state: 'detected' | 'confirmed' | 'resolved' | 'dismissed' | 'closed';
  severity: 'info' | 'unknown' | 'low' | 'medium' | 'high' | 'critical';
  confidence: 'ignore' | 'unknown' | 'experimental' | 'low' | 'medium' | 'high' | 'confirmed';
  report_type: string;
  project: SimpleProjectSchema;
  author_id: number;
  closed_by_id?: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}

export class Vulnerabilities<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  confirm<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/confirm`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  resolve<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/resolve`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  dismiss<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/dismiss`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  revert<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/revert`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
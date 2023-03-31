import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface VulnerabilitySchema extends Record<string, unknown> {
  id: number;
  title: string;
  description?: string;
  state: string;
  severity: string;
  confidence: string;
  report_type: string;
  project: SimpleProjectSchema;
  author_id: number;
  updated_by_id?: number;
  last_edited_by_id?: number;
  closed_by_id?: number;
  start_date?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
  last_edited_at?: string;
  closed_at?: string;
}

export class Vulnerabilities<C extends boolean = false> extends BaseResource<C> {
  confirm<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/confirm`,
      options,
    );
  }

  dismiss<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/dismiss`,
      options,
    );
  }

  revert<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/revert`,
      options,
    );
  }

  resolve<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    return RequestHelper.post<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}/resolve`,
      options,
    );
  }

  show<E extends boolean = false>(
    vulnerabilityId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VulnerabilitySchema, C, E, void>> {
    return RequestHelper.get<VulnerabilitySchema>()(
      this,
      endpoint`vulnerabilities/${vulnerabilityId}`,
      options,
    );
  }
}

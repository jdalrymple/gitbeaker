import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectVulnerabilitySchema extends Record<string, unknown> {
  author_id: number;
  confidence: string;
  created_at: string;
  description?: string;
  dismissed_at?: string;
  dismissed_by_id?: number;
  due_date?: string;
  finding: {
    confidence: string;
    created_at: string;
    id: number;
    location_fingerprint: string;
    metadata_version: string;
    name: string;
    primary_identifier_id: number;
    project_fingerprint: string;
    project_id: number;
    raw_metadata: string;
    report_type: string;
    scanner_id: number;
    severity: string;
    updated_at: string;
    uuid: string;
    vulnerability_id: number;
  };
  id: number;
  last_edited_at?: string;
  last_edited_by_id?: number;
  project: SimpleProjectSchema;
  project_default_branch: string;
  report_type: string;
  resolved_at?: string;
  resolved_by_id?: number;
  resolved_on_default_branch: boolean;
  severity: string;
  start_date?: string;
  state: string;
  title: string;
  updated_at: string;
  updated_by_id?: number;
}

export class ProjectVulnerabilities<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectVulnerabilitySchema[], C, E, P>> {
    return RequestHelper.get<ProjectVulnerabilitySchema[]>()(
      this,
      endpoint`projects/${projectId}/vulnerabilities`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    findingId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectVulnerabilitySchema, C, E, void>> {
    return RequestHelper.post<ProjectVulnerabilitySchema>()(
      this,
      endpoint`projects/${projectId}/vulnerabilities`,
      {
        ...options,
        searchParams: {
          findingId,
        },
      },
    );
  }
}

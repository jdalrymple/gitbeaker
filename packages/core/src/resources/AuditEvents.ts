import type {
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface AuditEventSchema extends Record<string, unknown> {
  id: number;
  author_id: number;
  entity_id: number;
  entity_type: string;
  details: {
    change?: string;
    from?: string;
    to?: string;
    custom_message?: string;
    author_name: string;
    author_email: string;
    target_id: string;
    target_type: string;
    target_details: string;
    ip_address: string;
    entity_path: string;
  };
  created_at: string;
}

export interface AllAuditEventOptions {
  createdAfter?: string;
  createdBefore?: string;
  entityType?: string;
  entityId?: number;
}

export class AuditEvents<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllAuditEventOptions &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<AuditEventSchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const uri = getPrefixedUrl('audit_events', { projects: projectId, groups: groupId });

    return RequestHelper.get<AuditEventSchema[]>()(this, uri, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  show<E extends boolean = false>(
    auditEventId: number,
    {
      projectId,
      groupId,
      ...options
    }: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo = {},
  ): Promise<GitlabAPIResponse<AuditEventSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const uri = getPrefixedUrl('audit_events', { projects: projectId, groups: groupId });

    return RequestHelper.get<AuditEventSchema>()(this, `${uri}/${auditEventId}`, {
      sudo,
      showExpanded,
    });
  }
}

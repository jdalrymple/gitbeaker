import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface AuditEventSchema extends Record<string, unknown> {
  id: number;
  author_id: number;
  entity_id: number;
  entity_type: string;
  details: {
    // Change-related fields
    change?: string;
    from?: string;
    to?: string;
    add?: string;
    remove?: string;

    // Message fields
    custom_message?: string;

    // Author information
    author_name?: string;
    author_email?: string;
    author_class?: string;

    // Target information
    target_id?: string | number;
    target_type?: string;
    target_details?: string;

    // Network and location
    ip_address?: string | null;
    entity_path?: string;

    // Additional dynamic fields that can appear in details
    [key: string]: unknown;
  };
  created_at: string;

  // Optional top-level fields that may appear in responses
  ip_address?: string;
  author_name?: string;
  entity_path?: string;
  target_details?: string;
  target_type?: string;
  target_id?: number;
  event_type?: string;
}

export interface AllAuditEventOptions {
  createdAfter?: string;
  createdBefore?: string;
  entityType?: 'User' | 'Group' | 'Project' | 'Gitlab::Audit::InstanceScope' | string;
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

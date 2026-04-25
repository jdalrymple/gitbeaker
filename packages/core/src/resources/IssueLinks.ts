import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import { MilestoneSchema } from '../templates/ResourceMilestones';
import { SimpleUserSchema } from './Users';

export interface IssueLinkSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  issue_link_id: number;
  state: string;
  description: string;
  weight?: number;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
  milestone: MilestoneSchema;
  assignees?: MappedOmit<SimpleUserSchema, 'created_at'>[];
  title: string;
  labels?: string[];
  user_notes_count: number;
  due_date: string;
  web_url: string;
  confidential: boolean;
  updated_at: string;
  link_created_at: string;
  link_updated_at: string;
  link_type: 'relates_to' | 'blocks' | 'is_blocked_by';
}

export interface ExpandedIssueLinkSchema extends Record<string, unknown> {
  source_issue: MappedOmit<
    IssueLinkSchema,
    'link_type' | 'link_created_at' | 'link_updated_at' | 'issue_link_id'
  >;
  target_issue: MappedOmit<
    IssueLinkSchema,
    'link_type' | 'link_created_at' | 'link_updated_at' | 'issue_link_id'
  >;
  link_type: 'relates_to' | 'blocks' | 'is_blocked_by';
}

export class IssueLinks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueLinkSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<IssueLinkSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/links`,
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
    issueIId: number,
    targetProjectId: string | number,
    targetIssueIId: number,
    options?: { linkType?: 'relates_to' | 'blocks' | 'is_blocked_by' } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedIssueLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedIssueLinkSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/links`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          targetProjectId,
          targetIssueIid: targetIssueIId,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    issueLinkId: number,
    options?: { linkType?: 'relates_to' | 'blocks' | 'is_blocked_by' } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedIssueLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del<ExpandedIssueLinkSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/links/${issueLinkId}`,
      { sudo, showExpanded, body },
    );
  }
}

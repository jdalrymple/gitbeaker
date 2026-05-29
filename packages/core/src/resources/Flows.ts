import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface FlowAdditionalContextSchema extends Record<string, unknown> {
  Category: string;
  Content: string;
}

export interface FlowWorkloadSchema extends Record<string, unknown> {
  id: string;
  message: string;
}

export interface FlowSchema extends Record<string, unknown> {
  id: number;
  project_id: number | null;
  namespace_id: number | null;
  agent_privileges: number[];
  agent_privileges_names: string[];
  pre_approved_agent_privileges: number[];
  pre_approved_agent_privileges_names: string[];
  workflow_definition: string;
  status: 'created' | 'running' | 'paused' | 'finished' | 'failed' | 'stopped' | 'input_required' | 'plan_approval_required' | 'tool_call_approval_required';
  allow_agent_to_request_user: boolean;
  image: string | null;
  environment: string | null;
  ai_catalog_item_version_id: number | null;
  workload: FlowWorkloadSchema;
  mcp_enabled: boolean;
  gitlab_url: string;
}

export interface AgentPrivilegeSchema extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  default_enabled: boolean;
}

export interface AgentPrivilegesResponseSchema extends Record<string, unknown> {
  all_privileges: AgentPrivilegeSchema[];
}

export class Flows<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    options: {
      additionalContext?: FlowAdditionalContextSchema[];
      agentPrivileges?: number[];
      aiCatalogItemConsumerId?: number;
      aiCatalogItemVersionId?: number;
      allowAgentToRequestUser?: boolean;
      environment?: 'ide' | 'web' | 'chat_partial' | 'chat' | 'ambient';
      goal?: string;
      image?: string;
      issueId?: number;
      mergeRequestId?: number;
      namespaceId?: string | number;
      preApprovedAgentPrivileges?: number[];
      projectId?: string | number;
      shallowClone?: boolean;
      sourceBranch?: string;
      startWorkflow?: boolean;
      workflowDefinition?: string;
    } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FlowSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<FlowSchema>()(this, 'ai/duo_workflows/workflows', {
      sudo,
      showExpanded,
      body,
    });
  }

  allAgentPrivileges<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AgentPrivilegesResponseSchema, C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<AgentPrivilegesResponseSchema>()(
      this,
      'ai/duo_workflows/workflows/agent_privileges',
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
}
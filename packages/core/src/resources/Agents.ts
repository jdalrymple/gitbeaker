import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

export interface ClusterAgentSchema extends Record<string, unknown> {
  id: number;
  name: string;
  config_project: SimpleProjectSchema;
  created_at: string;
  created_by_user_id: number;
}

export interface ClusterAgentTokenSchema extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  agent_id: number;
  status: string;
  token?: string;
  created_at: string;
  created_by_user_id: number;
}

export class Agents<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ClusterAgentSchema[], C, E, void>> {
    return RequestHelper.get<ClusterAgentSchema[]>()(
      this,
      endpoint`projects/${projectId}/cluster_agents`,
      options,
    );
  }

  allTokens<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ClusterAgentTokenSchema[], C, E, void>> {
    return RequestHelper.get<ClusterAgentTokenSchema[]>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens`,
      options,
    );
  }

  createToken<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    name: string,
    options?: { description?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ClusterAgentTokenSchema, C, E, void>> {
    return RequestHelper.get<ClusterAgentTokenSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens`,
      {
        name,
        ...options,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ClusterAgentSchema, C, E, void>> {
    return RequestHelper.get<ClusterAgentSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}`,
      options,
    );
  }

  showToken<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ClusterAgentTokenSchema, C, E, void>> {
    return RequestHelper.get<ClusterAgentTokenSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens/${tokenId}`,
      options,
    );
  }

  register<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ClusterAgentSchema, C, E, void>> {
    return RequestHelper.get<ClusterAgentSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents`,
      {
        name,
        ...options,
      },
    );
  }

  removeToken<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens/${tokenId}`,
      options,
    );
  }

  deregister<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}`,
      options,
    );
  }
}

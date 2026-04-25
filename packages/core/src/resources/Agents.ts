import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

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
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ClusterAgentSchema[]>()(
      this,
      endpoint`projects/${projectId}/cluster_agents`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allTokens<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentTokenSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ClusterAgentTokenSchema[]>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  createToken<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    name: string,
    options?: { description?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ClusterAgentTokenSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens`,
      {
        sudo,
        showExpanded,
        body: { ...body, name },
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ClusterAgentSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showToken<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    tokenId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ClusterAgentTokenSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens/${tokenId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  register<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ClusterAgentSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents`,
      {
        sudo,
        showExpanded,
        body: {
          name,
        },
      },
    );
  }

  removeToken<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    tokenId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/tokens/${tokenId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  unregister<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/cluster_agents/${agentId}`, {
      sudo,
      showExpanded,
    });
  }
}

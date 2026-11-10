import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

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
  description: string | null;
  agent_id: number;
  status: string;
  token?: string;
  created_at: string;
  created_by_user_id: string;
  last_used_at?: string | null;
}

export interface ClusterAgentUrlConfigurationSchema extends Record<string, unknown> {
  id: number;
  agent_id: number;
  url: string;
  public_key?: string;
  client_cert?: string;
  ca_cert?: string;
  tls_host?: string;
}

export class ClusterAgents<C extends boolean = false> extends BaseResource<C> {
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

  allUrlConfigurations<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentUrlConfigurationSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ClusterAgentUrlConfigurationSchema[]>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/url_configurations`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showUrlConfiguration<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    urlConfigId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentUrlConfigurationSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ClusterAgentUrlConfigurationSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/url_configurations/${urlConfigId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  createUrlConfiguration<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    url: string,
    options?: {
      clientCert?: string;
      clientKey?: string;
      caCert?: string;
      tlsHost?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ClusterAgentUrlConfigurationSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ClusterAgentUrlConfigurationSchema>()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/url_configurations`,
      {
        sudo,
        showExpanded,
        body: { ...body, url },
      },
    );
  }

  deleteUrlConfiguration<E extends boolean = false>(
    projectId: string | number,
    agentId: number,
    urlConfigId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/cluster_agents/${agentId}/url_configurations/${urlConfigId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

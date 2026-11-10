import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface OrbitQueryRequest extends Record<string, unknown> {
  query: Record<string, unknown>;
  queryType?: 'json';
  responseFormat?: 'raw' | 'llm';
}

export interface OrbitQuerySchema extends Record<string, unknown> {
  result: unknown[] | string;
  query_type: string;
  raw_query_strings?: string[];
  row_count: number;
}

export interface OrbitSchema extends Record<string, unknown> {
  schema_version: string;
  domains: {
    name: string;
    description?: string;
    node_names: string[];
  }[];
  nodes: Record<string, unknown>[];
  edges: Record<string, unknown>[];
}

export interface OrbitStatusSchema extends Record<string, unknown> {
  status: string;
  timestamp: string;
  version: string;
  components: {
    name: string;
    status: string;
    replicas: {
      ready: number;
      desired: number;
    };
    metrics: Record<string, unknown>;
  }[];
}

export interface OrbitToolSchema extends Record<string, unknown> {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export class Orbit<C extends boolean = false> extends BaseResource<C> {
  createQuery<E extends boolean = false>(
    queryRequest: OrbitQueryRequest,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<OrbitQuerySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<OrbitQuerySchema>()(this, 'orbit/query', {
      sudo,
      showExpanded,
      body: queryRequest,
    });
  }

  showSchema<E extends boolean = false>(
    options?: {
      expand?: string;
      responseFormat?: 'raw' | 'llm';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<OrbitSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<OrbitSchema>()(this, 'orbit/schema', {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  showStatus<E extends boolean = false>(
    options?: {
      responseFormat?: 'raw' | 'llm';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<OrbitStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<OrbitStatusSchema>()(this, 'orbit/status', {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  allTools<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<OrbitToolSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<OrbitToolSchema[]>()(this, 'orbit/tools', {
      sudo,
      showExpanded,
    });
  }
}

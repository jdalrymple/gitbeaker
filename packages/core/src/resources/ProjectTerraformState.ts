import { BaseResource } from '@gitbeaker/requester-utils';
import { GitlabAPIResponse, ShowExpanded, Sudo } from '@gitbeaker/core';
import { RequestHelper, endpoint } from '../infrastructure';

export interface TerraformStateSchema extends Record<string, unknown> {
  version: number;
  terraform_version: string;
  serial: number;
  lineage: string;
  outputs?: Record<string, unknown>;
  resources?: Record<string, unknown>[];
  check_results: Record<string, unknown>[];
}

export class ProjectTerraformState<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformStateSchema, C, E, void>> {
    return RequestHelper.get<TerraformStateSchema>()(
      this,
      endpoint`projects/${projectId}/terraform/state/${name}`,
      options,
    );
  }

  showVersion<E extends boolean = false>(
    projectId: string | number,
    name: string,
    serial: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformStateSchema, C, E, void>> {
    return RequestHelper.get<TerraformStateSchema>()(
      this,
      endpoint`projects/${projectId}/terraform/state/${name}/versions/${serial}`,
      options,
    );
  }

  removeVersion<E extends boolean = false>(
    projectId: string | number,
    name: string,
    serial: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/terraform/state/${name}/versions/${serial}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/terraform/state/${name}`,
      options,
    );
  }

  removeTerraformStateLock<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/terraform/state/${name}/lock`,
      options,
    );
  }

  createVersion<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TerraformStateSchema, C, E, void>> {
    return RequestHelper.post<TerraformStateSchema>()(
      this,
      endpoint`projects/${projectId}/terraform/state/${name}`,
      options,
    );
  }
}

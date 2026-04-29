import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { ResourceProtectedEnvironments } from '../templates';
import {
  ProtectedEnvironmentAccessLevelEntity,
  ProtectedEnvironmentSchema,
} from '../templates/ResourceProtectedEnvironments';

export interface ProjectProtectedEnvironments<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    deployAccessLevels: ProtectedEnvironmentAccessLevelEntity[],
    options?: {
      requiredApprovalCount?: number;
      approvalRules: ProtectedEnvironmentAccessLevelEntity[];
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: {
      deployAccessLevels?: ProtectedEnvironmentAccessLevelEntity[];
      requiredApprovalCount?: number;
      approvalRules?: ProtectedEnvironmentAccessLevelEntity[];
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>>;

  unprotect<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectProtectedEnvironments<
  C extends boolean = false,
> extends ResourceProtectedEnvironments<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}

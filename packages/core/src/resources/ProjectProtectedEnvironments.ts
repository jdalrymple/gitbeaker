import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceProtectedEnvironments } from '../templates';
import {
  ProtectedEnvironmentAccessLevelEntity,
  ProtectedEnvironmentSchema,
} from '../templates/ResourceProtectedEnvironments';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectProtectedEnvironments<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    deployAccessLevel: ProtectedEnvironmentAccessLevelEntity[],
    options?: {
      requiredApprovalCount?: number;
      approvalLevels: ProtectedEnvironmentAccessLevelEntity[];
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: {
      deployAccessLevels?: ProtectedEnvironmentAccessLevelEntity[];
      requiredApprovalCount?: number;
      approvalRules?: ProtectedEnvironmentAccessLevelEntity[];
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>>;

  unprotect<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectProtectedEnvironments<
  C extends boolean = false,
> extends ResourceProtectedEnvironments<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProtectedEnvironmentAccessLevel {
  access_level: 30 | 40 | 60;
  access_level_description: string;
  user_id?: number;
  group_id?: number;
}

export interface ProtectedEnvironmentSchema extends Record<string, unknown> {
  name: string;
  deploy_access_levels?: ProtectedEnvironmentAccessLevel[];
  required_approval_count: number;
}

export class ResourceProtectedEnvironments<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options: { search?: string } & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema[], C, E, P>> {
    return RequestHelper.get<ProtectedEnvironmentSchema[]>()(
      this,
      `${resourceId}/protected_environments`,
      options,
    );
  }

  protect<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    deployAccessLevel: ProtectedEnvironmentAccessLevel[],
    options?: { requiredApprovalCount?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>> {
    return RequestHelper.post<ProtectedEnvironmentSchema>()(
      this,
      `${resourceId}/protected_environments`,
      {
        name,
        deployAccessLevel,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: {
      deploy_access_levels?: ProtectedEnvironmentAccessLevel[];
      required_approval_count?: number;
      approval_rules?: ProtectedEnvironmentAccessLevel[];
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>> {
    return RequestHelper.put<ProtectedEnvironmentSchema>()(
      this,
      `${resourceId}/protected_environments/${name}`,
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>> {
    return RequestHelper.get<ProtectedEnvironmentSchema>()(
      this,
      `${resourceId}/protected_environments/${name}`,
      options,
    );
  }

  unprotect<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `${resourceId}/protected_environments/${name}`, options);
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface CICDVariableSchema extends Record<string, unknown> {
  key: string;
  variable_type: string;
  value: string;
  protected: boolean;
  masked: boolean;
  raw: boolean;
}

export class InstanceLevelCICDVariables<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CICDVariableSchema[], C, E, void>> {
    return RequestHelper.get<CICDVariableSchema[]>()(this, 'admin/ci/variables', options);
  }

  create<E extends boolean = false>(
    key: string,
    value: string,
    options?: {
      variableType?: string;
      protected?: boolean;
      masked?: boolean;
      raw?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    return RequestHelper.post<CICDVariableSchema>()(this, 'admin/ci/variables', {
      key,
      value,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    keyId: string,
    value: string,
    options?: {
      variableType?: string;
      protected?: boolean;
      masked?: boolean;
      raw?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    return RequestHelper.put<CICDVariableSchema>()(this, endpoint`admin/ci/variables/${keyId}`, {
      value,
      ...options,
    });
  }

  show<E extends boolean = false>(
    keyId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    return RequestHelper.get<CICDVariableSchema>()(
      this,
      endpoint`admin/ci/variables/${keyId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    keyId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.get<void>()(this, endpoint`admin/ci/variables/${keyId}`, options);
  }
}

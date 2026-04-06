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
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CICDVariableSchema[]>()(this, 'admin/ci/variables', {
      sudo,
      showExpanded,
    });
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
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CICDVariableSchema>()(this, 'admin/ci/variables', {
      sudo,
      showExpanded,
      body: { ...body, key, value },
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
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<CICDVariableSchema>()(this, endpoint`admin/ci/variables/${keyId}`, {
      sudo,
      showExpanded,
      body: { ...body, value },
    });
  }

  show<E extends boolean = false>(
    keyId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CICDVariableSchema>()(this, endpoint`admin/ci/variables/${keyId}`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    keyId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<void>()(this, endpoint`admin/ci/variables/${keyId}`, {
      sudo,
      showExpanded,
    });
  }
}

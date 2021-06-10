import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens } from '../templates';
import { DeployTokenScope, DeployTokenSchema } from '../templates/types';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';

export interface ProjectDeployTokens<C extends boolean = false> extends ResourceDeployTokens<C> {
  add(
    projectId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DeployTokenSchema>>;

  all(
    options?: { projectId?: string | number } & PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DeployTokenSchema>[]>;

  remove(projectId: string | number, tokenId: number, options?: Sudo): Promise<void>;
}

export class ProjectDeployTokens<C extends boolean = false> extends ResourceDeployTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}

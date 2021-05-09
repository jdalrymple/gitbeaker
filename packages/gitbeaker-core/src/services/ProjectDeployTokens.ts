import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens, DeployTokenScope, DeployTokenSchema } from '../templates';
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

  all({
    projectId,
    ...options
  }: { projectId?: string | number } & PaginatedRequestOptions): Promise<
    CamelizedRecord<C, DeployTokenSchema>[]
  >;

  remove(projectId: string | number, tokenId: number, options?: Sudo): Promise<void>;
}

export class ProjectDeployTokens<C extends boolean = false> extends ResourceDeployTokens<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}

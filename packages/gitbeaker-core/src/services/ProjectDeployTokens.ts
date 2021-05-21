import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens, DeployTokenScope, DeployTokenSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectDeployTokens extends ResourceDeployTokens {
  add(
    projectId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ): Promise<DeployTokenSchema>;

  all({
    projectId,
    ...options
  }: { projectId?: string | number } & PaginatedRequestOptions): Promise<DeployTokenSchema[]>;

  remove(projectId: string | number, tokenId: number, options?: Sudo): Promise<void>;
}

export class ProjectDeployTokens extends ResourceDeployTokens {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}

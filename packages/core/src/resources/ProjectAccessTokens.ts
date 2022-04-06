import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { Sudo, CamelizedRecord } from '../infrastructure';
import { AccessTokenCreatedSchema, AccessTokenRequestSchema, AccessTokenSchema, ResourceAccessTokens } from '../templates/ResourceAccessTokens';

export interface ProjectAccessTokens<C extends boolean = false>
  extends ResourceAccessTokens<C> {

  all(resourceId: string | number): Promise<CamelizedRecord<C, AccessTokenSchema>[]>;
  create(resourceId: string | number, tokenSpecifications: AccessTokenRequestSchema & Sudo): Promise<CamelizedRecord<C, AccessTokenCreatedSchema>>;
  show(resourceId: string | number, tokenId: string | number): Promise<CamelizedRecord<C, AccessTokenSchema>>;
  revoke(resourceId: string | number, tokenId: string | number): Promise<void>;
}

export class ProjectAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export interface SAMLGroupSchema extends Record<string, unknown> {
  name: string;
  access_level: number;
}

export class GroupSAMLLinks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema[], C, E, P>> {
    return RequestHelper.get<SAMLGroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/saml_group_links`,
      options,
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema, C, E, void>> {
    return RequestHelper.post<SAMLGroupSchema>()(
      this,
      endpoint`groups/${groupId}/saml_group_links`,
      {
        accessLevel,
        samlGroupName,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/saml_group_links/${samlGroupName}`,
      options,
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema, C, E, void>> {
    return RequestHelper.get<SAMLGroupSchema>()(
      this,
      endpoint`groups/${groupId}/saml_group_links/${samlGroupName}`,
      options,
    );
  }
}

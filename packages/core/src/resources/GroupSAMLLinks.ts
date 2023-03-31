import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface SAMLGroupSchema extends Record<string, unknown> {
  name: string;
  access_level: number;
}

export class GroupSAMLLinks<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    accessLevel: number,
    options?: BaseRequestOptions<E>,
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

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema[], C, E, P>> {
    return RequestHelper.get<SAMLGroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/saml_group_links`,
      options,
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`groups/${groupId}/saml_group_links`, {
      searchParams: {
        samlGroupName,
      },
      ...options,
    });
  }

  show<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema, C, E, void>> {
    return RequestHelper.get<SAMLGroupSchema>()(
      this,
      endpoint`groups/${groupId}/saml_group_links`,
      {
        samlGroupName,
        ...options,
      },
    );
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
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
    options: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SAMLGroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/saml_group_links`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<SAMLGroupSchema>()(
      this,
      endpoint`groups/${groupId}/saml_group_links`,
      {
        sudo,
        showExpanded,
        body: { ...body, accessLevel, samlGroupName },
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/saml_group_links/${samlGroupName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    samlGroupName: string,
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SAMLGroupSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SAMLGroupSchema>()(
      this,
      endpoint`groups/${groupId}/saml_group_links/${samlGroupName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}

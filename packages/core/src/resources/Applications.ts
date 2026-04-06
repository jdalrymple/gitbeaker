import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ApplicationSchema extends Record<string, unknown> {
  id: number;
  application_id: string;
  application_name: string;
  secret: string;
  callback_url: string;
  confidential: boolean;
}

export class Applications<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ApplicationSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ApplicationSchema[]>()(this, 'applications', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P>,
    });
  }

  create<E extends boolean = false>(
    name: string,
    redirectUri: string,
    scopes: string,
    options?: { confidential?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ApplicationSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ApplicationSchema>()(this, 'applications', {
      sudo,
      showExpanded,
      body: {
        ...body,
        name,
        redirectUri,
        scopes,
      },
    });
  }

  remove<E extends boolean = false>(
    applicationId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `applications/${applicationId}`, {
      sudo,
      showExpanded,
    });
  }
}

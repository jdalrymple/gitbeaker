import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
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
    return RequestHelper.get<ApplicationSchema[]>()(this, 'applications', options);
  }

  create<E extends boolean = false>(
    name: string,
    redirectUri: string,
    scopes: string,
    options?: { confidential?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ApplicationSchema, C, E, void>> {
    return RequestHelper.post<ApplicationSchema>()(this, 'applications', {
      name,
      redirectUri,
      scopes,
      ...options,
    });
  }

  remove<E extends boolean = false>(
    applicationId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `applications/${applicationId}`, options);
  }
}

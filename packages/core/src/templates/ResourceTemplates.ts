import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface TemplateSchema extends Record<string, unknown> {
  name: string;
  content: string;
}

export class ResourceTemplates<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: ['templates', resourceType].join('/'), ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TemplateSchema[], C, E, P>> {
    process.emitWarning(
      'This API will be deprecated as of Gitlabs v5 API. Please make the switch to "ProjectTemplates".',
      'DeprecationWarning',
    );

    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<TemplateSchema[]>()(this, endpoint``, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  show<E extends boolean = false>(
    key: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TemplateSchema, C, E, void>> {
    process.emitWarning(
      'This API will be deprecated as of Gitlabs v5 API. Please make the switch to "ProjectTemplates".',
      'DeprecationWarning',
    );

    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<TemplateSchema>()(this, endpoint`${key}`, {
      sudo,
      showExpanded,
    });
  }
}

import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
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
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<TemplateSchema[], C, E, P>> {
    process.emitWarning(
      'This API will be deprecated as of Gitlabs v5 API. Please make the switch to "ProjectTemplates".',
      'DeprecationWarning',
    );

    return RequestHelper.get<TemplateSchema[]>()(this, '', options);
  }

  show<E extends boolean = false>(
    key: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TemplateSchema, C, E, void>> {
    process.emitWarning(
      'This API will be deprecated as of Gitlabs v5 API. Please make the switch to "ProjectTemplates".',
      'DeprecationWarning',
    );

    return RequestHelper.get<TemplateSchema>()(this, encodeURIComponent(key), options);
  }
}

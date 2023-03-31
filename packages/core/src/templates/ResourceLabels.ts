import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  Either,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface LabelSchema extends Record<string, unknown> {
  id: number;
  name: string;
  color: string;
  text_color: string;
  description: string;
  description_html: string;
  open_issues_count: number;
  closed_issues_count: number;
  open_merge_requests_count: number;
  subscribed: boolean;
  priority: number;
  is_project_label: boolean;
}

export class ResourceLabels<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<LabelSchema[], C, E, P>> {
    return RequestHelper.get<LabelSchema[]>()(this, endpoint`${resourceId}/labels`, options);
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    labelName: string,
    color: string,
    options?: { description?: string; priority?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    return RequestHelper.post<LabelSchema>()(this, endpoint`${resourceId}/labels`, {
      name: labelName,
      color,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    resourceId: number | string,
    labelId: number | string,
    options: Either<{ newName: string }, { color: string }> & {
      description?: string;
      priority?: number;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    if (!options?.newName && !options?.color)
      throw new Error(
        'Missing required argument. Please supply a color or a newName in the options parameter.',
      );

    return RequestHelper.put<LabelSchema>()(
      this,
      endpoint`${resourceId}/labels/${labelId}`,
      options,
    );
  }

  promote<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    return RequestHelper.put<LabelSchema>()(
      this,
      endpoint`${resourceId}/labels/${labelId}/promote`,
      options,
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/labels/${labelId}`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    return RequestHelper.get<LabelSchema>()(
      this,
      endpoint`${resourceId}/labels/${labelId}`,
      options,
    );
  }

  subscribe<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    return RequestHelper.post<LabelSchema>()(
      this,
      endpoint`${resourceId}/issues/${labelId}/subscribe`,
      options,
    );
  }

  unsubscribe<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    return RequestHelper.post<LabelSchema>()(
      this,
      endpoint`${resourceId}/issues/${labelId}/unsubscribe`,
      options,
    );
  }
}

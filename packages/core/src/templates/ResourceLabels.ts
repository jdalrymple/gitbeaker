import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface SimpleLabelSchema extends Record<string, unknown> {
  id: number;
  name: string;
  description: null | string;
  description_html: string;
  text_color: string;
  color: string;
}

export interface LabelSchema extends SimpleLabelSchema {
  open_issues_count: number;
  closed_issues_count: number;
  open_merge_requests_count: number;
  subscribed: boolean;
  priority: number;
  is_project_label: boolean;
}

export interface LabelCountSchema extends Record<string, unknown> {
  open_issues_count: number;
  closed_issues_count: number;
  open_merge_requests_count: number;
}

export class ResourceLabels<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options: {
      withCounts: true;
      includeAncestorGroups?: boolean;
      search?: string;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<(LabelCountSchema & LabelSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: {
      includeAncestorGroups?: boolean;
      search?: string;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: {
      withCounts?: boolean;
      includeAncestorGroups?: boolean;
      search?: string;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<LabelSchema[]>()(this, endpoint`${resourceId}/labels`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    labelName: string,
    color: string,
    options?: { description?: string; priority?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<LabelSchema>()(this, endpoint`${resourceId}/labels`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        name: labelName,
        color,
      },
    });
  }

  edit<E extends boolean = false>(
    resourceId: number | string,
    labelId: number | string,
    options: {
      description?: string;
      priority?: number;
    } & OneOf<{ newName: string; color: string }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    if (!options?.newName && !options?.color)
      throw new Error(
        'Missing required argument. Please supply a color or a newName in the options parameter.',
      );

    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<LabelSchema>()(this, endpoint`${resourceId}/labels/${labelId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  promote<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<LabelSchema>()(
      this,
      endpoint`${resourceId}/labels/${labelId}/promote`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/labels/${labelId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: { includeAncestorGroups?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<LabelSchema>()(this, endpoint`${resourceId}/labels/${labelId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  subscribe<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<LabelSchema>()(
      this,
      endpoint`${resourceId}/issues/${labelId}/subscribe`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  unsubscribe<E extends boolean = false>(
    resourceId: string | number,
    labelId: number | string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<LabelSchema>()(
      this,
      endpoint`${resourceId}/issues/${labelId}/unsubscribe`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }
}

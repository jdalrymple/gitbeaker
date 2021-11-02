import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  ShowExpanded,
  endpoint,
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

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<LabelSchema[]>()(this, endpoint`${resourceId}/labels`, options);
  }

  create(
    resourceId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<LabelSchema>()(this, endpoint`${resourceId}/labels`, {
      name: labelName,
      color,
      ...options,
    });
  }

  edit(resourceId: string | number, labelId: number | string, options?: BaseRequestOptions) {
    return RequestHelper.put<LabelSchema>()(
      this,
      endpoint`${resourceId}/labels/${labelId}`,
      options,
    );
  }

  remove(resourceId: string | number, labelId: number | string, options?: Sudo & ShowExpanded) {
    return RequestHelper.del()(this, endpoint`${resourceId}/labels/${labelId}`, options);
  }

  subscribe(resourceId: string | number, labelId: number | string, options?: Sudo & ShowExpanded) {
    return RequestHelper.post<LabelSchema>()(
      this,
      endpoint`${resourceId}/issues/${labelId}/subscribe`,
      options,
    );
  }

  unsubscribe(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded,
  ) {
    return RequestHelper.post<LabelSchema>()(
      this,
      endpoint`${resourceId}/issues/${labelId}/unsubscribe`,
      options,
    );
  }
}

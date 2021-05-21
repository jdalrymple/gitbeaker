import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions } from '../infrastructure';
import { EventOptions, EventSchema } from '../models';

export class Events<C extends boolean = false> extends BaseService<C> {
  all({
    projectId,
    ...options
  }: { projectId?: string | number } & PaginatedRequestOptions & EventOptions = {}) {
    let url: string;

    if (projectId) {
      const pId = encodeURIComponent(projectId);

      url = `projects/${pId}/events`;
    } else {
      url = 'events';
    }

    return RequestHelper.get<EventSchema[]>()(this, url, options);
  }
}

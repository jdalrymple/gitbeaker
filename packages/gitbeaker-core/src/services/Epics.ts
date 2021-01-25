import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class Epics<C extends boolean> extends BaseService<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C>(this, `groups/${gId}/epics`, options);
  }

  create(groupId: string | number, title: string, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post<C>(this, `groups/${gId}/epics`, { title, ...options });
  }

  edit(groupId: string | number, epicId: number, options?: BaseRequestOptions) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.put<C>(this, `groups/${gId}/epics/${eId}`, options);
  }

  remove(groupId: string | number, epicId: number, options?: Sudo) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `groups/${gId}/epics/${eId}`, options);
  }

  show(groupId: string | number, epicId: number, options?: Sudo) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `groups/${gId}/epics/${eId}`, options);
  }
}

import {
  BaseRequestOptions,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';
import { ResourceLabels } from '../templates';

export interface GroupLabels extends ResourceLabels {
  all(groupId: string | number, options?: PaginatedRequestOptions);

  create(groupId: string | number, labelName: string, color: string, options?: BaseRequestOptions);

  edit(groupId: string | number, labelName: string, options?: BaseRequestOptions);

  remove(groupId: string | number, labelName: string, options?: Sudo);

  subscribe(groupId: string | number, labelId: number, options?: Sudo);

  unsubscribe(groupId: string | number, labelId: number, options?: Sudo);
}

export class GroupLabels extends ResourceLabels {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}

import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { ResourceLabels, LabelSchema } from '../templates';

export interface GroupLabels extends ResourceLabels {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<LabelSchema[]>;

  create(
    groupId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  ): Promise<LabelSchema>;

  edit(
    groupId: string | number,
    labelId: number | string,
    options?: BaseRequestOptions,
  ): Promise<LabelSchema>;

  remove(groupId: string | number, labelId: number | string, options?: Sudo): Promise<void>;

  subscribe(
    groupId: string | number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<LabelSchema>;

  unsubscribe(
    groupId: string | number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<LabelSchema>;
}

export class GroupLabels extends ResourceLabels {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}

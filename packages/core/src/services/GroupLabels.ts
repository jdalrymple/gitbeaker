import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';
import { ResourceLabels, LabelSchema } from '../templates';

export interface GroupLabels<C extends boolean = false> extends ResourceLabels<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, LabelSchema>[]>;

  create(
    groupId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, LabelSchema>>;

  edit(
    groupId: string | number,
    labelId: number | string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, LabelSchema>>;

  remove(groupId: string | number, labelId: number | string, options?: Sudo): Promise<void>;

  subscribe(
    groupId: string | number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, LabelSchema>>;

  unsubscribe(
    groupId: string | number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, LabelSchema>>;
}

export class GroupLabels<C extends boolean = false> extends ResourceLabels<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}

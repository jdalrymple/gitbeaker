import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';
import { ResourceLabels, LabelSchema } from '../templates';

export interface Labels<C extends boolean = false> extends ResourceLabels<C> {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, LabelSchema>[]>;

  create(
    projectId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, LabelSchema>>;

  edit(
    projectId: string | number,
    labelId: number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, LabelSchema>>;

  remove(projectId: string | number, labelId: number, options?: Sudo): Promise<void>;

  subscribe(
    projectId: string | number,
    labelId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, LabelSchema>>;

  unsubscribe(
    projectId: string | number,
    labelId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, LabelSchema>>;
}

export class Labels<C extends boolean = false> extends ResourceLabels<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}

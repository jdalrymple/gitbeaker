import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { ResourceLabels, LabelSchema } from '../templates';

export interface Labels extends ResourceLabels {
  all(projectId: string | number, options?: PaginatedRequestOptions): Promise<LabelSchema[]>;

  create(
    projectId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  ): Promise<LabelSchema>;

  edit(
    projectId: string | number,
    labelId: number | string,
    options?: BaseRequestOptions,
  ): Promise<LabelSchema>;

  remove(projectId: string | number, labelId: number | string, options?: Sudo): Promise<void>;

  subscribe(
    projectId: string | number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<LabelSchema>;

  unsubscribe(
    projectId: string | number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<LabelSchema>;
}

export class Labels extends ResourceLabels {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}

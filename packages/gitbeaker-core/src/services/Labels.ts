import {
  BaseRequestOptions,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';
import { ResourceLabels } from '../templates';

export interface Labels extends ResourceLabels {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  create(
    projectId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  );

  edit(projectId: string | number, labelName: string, options?: BaseRequestOptions);

  remove(projectId: string | number, labelName: string, options?: Sudo);

  subscribe(projectId: string | number, labelId: number, options?: Sudo);

  unsubscribe(projectId: string | number, labelId: number, options?: Sudo);
}

export class Labels extends ResourceLabels {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}

import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class GitignoreTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('gitignores', options);
  }
}

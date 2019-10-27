import { ResourceTemplates } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GitignoreTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions = {}) {
    super('gitignores', options);
  }
}

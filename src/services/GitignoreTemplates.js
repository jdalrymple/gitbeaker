import { ResourceTemplates } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceTemplates)
class GitignoreTemplates extends ResourceTemplates {
  constructor(options) {
    super('gitignores', options);
  }
}

export default GitignoreTemplates;

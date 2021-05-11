import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class DockerfileTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('dockerfiles', options);
  }
}

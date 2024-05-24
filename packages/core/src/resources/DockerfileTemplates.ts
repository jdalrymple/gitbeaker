import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class DockerfileTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('dockerfiles', options);
  }
}

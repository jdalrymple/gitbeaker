import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class DockerfileTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('dockerfiles', options);
  }
}

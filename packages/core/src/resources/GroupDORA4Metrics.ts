import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceDORA4Metrics } from '../templates';

export class GroupDORA4Metrics<C extends boolean = false> extends ResourceDORA4Metrics<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}

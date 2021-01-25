import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Lint<C extends boolean> extends BaseService<C> {
  lint(content: string, options?: Sudo) {
    return RequestHelper.post<C>(this, 'ci/lint', { content, ...options });
  }
}

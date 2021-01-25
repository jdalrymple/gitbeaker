import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export class Markdown<C extends boolean> extends BaseService<C> {
  render(text: string, options?: { gfm?: string; project?: string | number } & Sudo) {
    return RequestHelper.post<C>(this, 'markdown', { text, ...options });
  }
}

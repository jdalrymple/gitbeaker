import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';

export interface MarkdownSchema extends Record<string, unknown> {
  html: string;
}

export class Markdown extends BaseService {
  render(text: string, options?: { gfm?: string; project?: string | number } & Sudo) {
    return RequestHelper.post<MarkdownSchema>()(this, 'markdown', { text, ...options });
  }
}

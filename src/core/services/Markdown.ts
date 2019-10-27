import { BaseService, RequestHelper, Sudo } from '../infrastructure';

export class Markdown extends BaseService {
  render(text: string, options: { gfm?: string; project?: string | number } & Sudo) {
    return RequestHelper.post(this, 'markdown', { text, ...options });
  }
}

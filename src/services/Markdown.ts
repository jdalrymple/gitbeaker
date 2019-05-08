import { BaseService, RequestHelper } from '../infrastructure';
import { Sudo, ProjectId } from '../../types/types';

class Markdown extends BaseService {
  render(text: string, options: { gfm?: string; project?: ProjectId } & Sudo) {
    return RequestHelper.post(this, 'markdown', { text, ...options });
  }
}

export default Markdown;

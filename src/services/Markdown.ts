import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class Markdown extends BaseService {
  render(text: string, options: RequestOptions) {
    return RequestHelper.post(this, 'markdown', { text, ...options });
  }
}

export default Markdown;

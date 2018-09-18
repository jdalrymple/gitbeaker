import { BaseService, RequestHelper } from '../infrastructure';

class Markdown extends BaseService {
  render(text, options) {
    return RequestHelper.post(this, 'markdown', { text, ...options });
  }
}

export default Markdown;

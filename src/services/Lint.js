import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Lint extends BaseService {
  @api('<content>', { method: 'POST' })
  lint(content) {
    return RequestHelper.post(this, 'lint', { content });
  }
}

export default Lint;

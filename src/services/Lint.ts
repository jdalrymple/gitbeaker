import { BaseService, RequestHelper } from '../infrastructure';
import { Sudo } from '@typings';

class Lint extends BaseService {
  lint(content: string, options?: Sudo) {
    return RequestHelper.post(this, 'lint', { content, ...options});
  }
}

export default Lint;

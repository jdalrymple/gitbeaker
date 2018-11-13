import { BaseService, RequestHelper } from '../infrastructure';
import { Sudo } from '@src/types';

class Lint extends BaseService {
  lint(content: string, options?: Sudo) {
    return RequestHelper.post(this, 'lint', { content, ...options});
  }
}

export default Lint;

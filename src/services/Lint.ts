import { BaseService, RequestHelper } from '../infrastructure';

class Lint extends BaseService {
  lint(content: string, options?: Sudo) {
    return RequestHelper.post(this, 'ci/lint', { content, ...options });
  }
}

export default Lint;

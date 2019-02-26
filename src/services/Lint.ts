import { BaseService, RequestHelper } from '../infrastructure';

class Lint extends BaseService {
  lint(content: string) {
    return RequestHelper.post(this, 'ci/lint', { content });
  }
}

export default Lint;

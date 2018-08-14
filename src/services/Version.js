import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Version extends BaseService {
  @api({ method: 'GET' })
  show() {
    return RequestHelper.get(this, 'version');
  }
}

export default Version;

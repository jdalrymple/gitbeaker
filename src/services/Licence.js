import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Licence extends BaseService {
  @api({ method: 'GET' })
  all() {
    return RequestHelper.get(this, 'licence');
  }

  @api({ method: 'POST' })
  create() {
    return RequestHelper.post(this, 'licence');
  }
}

export default Licence;

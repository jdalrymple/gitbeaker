import { BaseService, RequestHelper } from '../infrastructure';

class Licence extends BaseService {
  all() {
    return RequestHelper.get(this, 'licence');
  }

  create() {
    return RequestHelper.post(this, 'licence');
  }
}

export default Licence;

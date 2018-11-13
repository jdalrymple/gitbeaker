import { BaseService, RequestHelper } from '../infrastructure';
import { Sudo } from '@src/types';

class Licence extends BaseService {
  all(options?: Sudo) {
    return RequestHelper.get(this, 'licence', options);
  }

  create(options?: Sudo) {
    return RequestHelper.post(this, 'licence', options);
  }
}

export default Licence;

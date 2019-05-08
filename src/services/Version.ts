import { BaseService, RequestHelper } from '../infrastructure';
import { Sudo } from '../../types/types';

class Version extends BaseService {
  show(options?: Sudo) {
    return RequestHelper.get(this, 'version', options);
  }
}

export default Version;

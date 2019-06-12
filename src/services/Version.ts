import { BaseService, RequestHelper, Sudo } from '../infrastructure';

class Version extends BaseService {
  show(options?: Sudo) {
    return RequestHelper.get(this, 'version', options);
  }
}

export default Version;

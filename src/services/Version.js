import { BaseService, RequestHelper } from '../infrastructure';

class Version extends BaseService {
  show() {
    return RequestHelper.get(this, 'version');
  }
}

export default Version;

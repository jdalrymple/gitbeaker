import { BaseService, RequestHelper } from '../infrastructure';

class Keys extends BaseService {
  show(keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `keys/${kId}`);
  }
}

export default Keys;

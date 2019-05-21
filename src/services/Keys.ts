import { BaseService, RequestHelper } from '../infrastructure';

class Keys extends BaseService {
  show(keyId: KeyId, options?: Sudo) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `keys/${kId}`, options);
  }
}

export default Keys;

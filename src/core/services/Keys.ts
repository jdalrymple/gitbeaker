import { BaseService, RequestHelper, Sudo } from '../infrastructure';
import { KeyId } from '.';

class Keys extends BaseService {
  show(keyId: KeyId, options?: Sudo) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `keys/${kId}`, options);
  }
}

export default Keys;

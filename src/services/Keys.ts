import { BaseService, RequestHelper } from '../infrastructure';
import { Sudo, KeyId } from '@src/types';

class Keys extends BaseService {
  show(keyId: KeyId, options?: Sudo) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `keys/${kId}`, options);
  }
}

export default Keys;

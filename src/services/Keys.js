import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Keys extends BaseService {
  @api('<keyId>', { method: 'GET' })
  show(keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `keys/${kId}`);
  }
}

export default Keys;

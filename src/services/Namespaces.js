import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Namespaces extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'namespaces', options);
  }

  @api('<namespaceId>', { options: true, method: 'GET' })
  show(namespaceId) {
    const nId = encodeURIComponent(namespaceId);

    return RequestHelper.get(this, `namespaces/${nId}`);
  }
}

export default Namespaces;

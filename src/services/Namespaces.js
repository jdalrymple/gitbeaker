import { BaseService, RequestHelper } from '../infrastructure';

class Namespaces extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'namespaces', options);
  }

  show(namespaceId) {
    const nId = encodeURIComponent(namespaceId);

    return RequestHelper.get(this, `namespaces/${nId}`);
  }
}

export default Namespaces;

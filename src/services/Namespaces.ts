import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class Namespaces extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'namespaces', options);
  }

  show(namespaceId: string | number) {
    const nId = encodeURIComponent(namespaceId);

    return RequestHelper.get(this, `namespaces/${nId}`);
  }
}

export default Namespaces;

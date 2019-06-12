import { BaseService, RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { NamespaceId } from '.';

class Namespaces extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'namespaces', options);
  }

  show(namespaceId: NamespaceId, options: { search?: string } & Sudo) {
    const nId = encodeURIComponent(namespaceId);

    return RequestHelper.get(this, `namespaces/${nId}`, options);
  }
}

export default Namespaces;

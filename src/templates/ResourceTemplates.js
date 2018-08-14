import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceTemplates extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, 'templates', resourceType);
  }

  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, '', options);
  }

  @api('<resourceId>', { method: 'POST' })
  show(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}`);
  }
}

export default ResourceTemplates;

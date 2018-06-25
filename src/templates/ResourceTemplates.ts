import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

class ResourceTemplates extends BaseService {
  constructor(resourceType, baseParams) {
    super(baseParams);

    this.url = URLJoin(this.url, 'templates', resourceType);
  }

  all(options) {
    return RequestHelper.get(this, '', options);
  }

  show(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}`);
  }
}

export default ResourceTemplates;

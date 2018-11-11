import { BaseService, RequestHelper } from '../infrastructure';

class ResourceTemplates extends BaseService {
  constructor(resourceType, baseParams) {
    super({ url: ['templates', resourceType].join('/'), ...baseParams });
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

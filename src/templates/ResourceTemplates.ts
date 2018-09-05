import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ResourceTemplates extends BaseService {
  constructor(resourceType, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, 'templates', resourceType);
  }

  all(options) {
    return RequestHelper.get(this, '', options);
  }

  show(resourceId: string) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}`);
  }
}

export default ResourceTemplates;

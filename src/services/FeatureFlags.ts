import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class FeatureFlags extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'features', options);
  }

  set(name: string, options: RequestOptions) {
    const encodedName = encodeURIComponent(name);

    return RequestHelper.post(this, `features/${encodedName}`, options);
  }
}

export default FeatureFlags;

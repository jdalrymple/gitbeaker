import { BaseService, RequestHelper } from '../infrastructure';

class FeatureFlags extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'features', options);
  }

  set(name, options) {
    const encodedName = encodeURIComponent(name);

    return RequestHelper.post(this, `features/${encodedName}`, options);
  }
}

export default FeatureFlags;

import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class FeatureFlags extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'features', options);
  }

  @api('<name>', { options: true, method: 'DELETE' })
  set(name, options) {
    const encodedName = encodeURIComponent(name);

    return RequestHelper.post(this, `features/${encodedName}`, options);
  }
}

export default FeatureFlags;

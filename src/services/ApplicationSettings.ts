import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, Sudo } from '@typings';

class ApplicationSettings extends BaseService {
  all(options?: Sudo) {
    return RequestHelper.get(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions) {
    return RequestHelper.put(this, 'application/settings', options);
  }
}

export default ApplicationSettings;

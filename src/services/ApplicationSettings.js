import { BaseService, RequestHelper } from '../infrastructure';

class ApplicationSettings extends BaseService {
  all() {
    return RequestHelper.get(this, 'application/settings');
  }

  edit(options) {
    return RequestHelper.put(this, 'application/settings', options);
  }
}

export default ApplicationSettings;

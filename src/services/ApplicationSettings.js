import { BaseService, RequestHelper } from '../infrastructure';

class ApplicationSettings extends BaseService {
  all() {
    return RequestHelper.get(this, 'application/settings');
  }

  edit(options) {
    return RequestHelper.post(this, 'application/settings', options);
  }
}

export default ApplicationSettings;

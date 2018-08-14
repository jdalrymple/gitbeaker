import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class ApplicationSettings extends BaseService {
  @api({ options: true, method: 'GET' })
  all() {
    return RequestHelper.get(this, 'application/settings');
  }

  @api({ options: true, method: 'POST' })
  edit(options) {
    return RequestHelper.post(this, 'application/settings', options);
  }
}

export default ApplicationSettings;

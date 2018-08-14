import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class ApplicationSettings extends BaseService {
  @api()
  all() {
    return RequestHelper.get(this, 'application/settings');
  }

  @api({ options: true })
  edit(options) {
    return RequestHelper.post(this, 'application/settings', options);
  }
}

export default ApplicationSettings;

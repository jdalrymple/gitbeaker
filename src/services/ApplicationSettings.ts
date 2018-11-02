import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class ApplicationSettings extends BaseService {
  all() {
    return RequestHelper.get(this, 'application/settings');
  }

  edit(options: RequestOptions) {
    return RequestHelper.put(this, 'application/settings', options);
  }
}

export default ApplicationSettings;

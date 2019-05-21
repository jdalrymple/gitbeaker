import { BaseService, RequestHelper } from '../infrastructure';

class Events extends BaseService {
  all(options?: PaginatedRequestOptions & EventOptions) {
    return RequestHelper.get(this, 'events', options);
  }
}

export default Events;

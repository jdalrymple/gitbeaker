import { BaseService, RequestHelper, PaginatedRequestOptions } from '../infrastructure';
import { EventOptions } from '.';

class Events extends BaseService {
  all(options?: PaginatedRequestOptions & EventOptions) {
    return RequestHelper.get(this, 'events', options);
  }
}

export default Events;

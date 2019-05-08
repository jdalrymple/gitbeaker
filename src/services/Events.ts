import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, EventOptions } from '../../types/types';

class Events extends BaseService {
  all(options?: PaginatedRequestOptions & EventOptions) {
    return RequestHelper.get(this, 'events', options);
  }
}

export default Events;

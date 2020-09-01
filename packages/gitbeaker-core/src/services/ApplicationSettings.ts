import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export class ApplicationSettings extends BaseService {
  all(options?: Sudo): Promise<RequestHelper.GetResponse> {
    return RequestHelper.get(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions): Promise<RequestHelper.PutResponse> {
    return RequestHelper.put(this, 'application/settings', options);
  }
}

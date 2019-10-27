import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

export class FeatureFlags extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'features', options);
  }

  set(name: string, options?: BaseRequestOptions) {
    const encodedName = encodeURIComponent(name);

    return RequestHelper.post(this, `features/${encodedName}`, options);
  }
}

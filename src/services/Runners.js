import { BaseService, RequestHelper } from '../infrastructure';

class Runners extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'runners/all', options);
  }

  allOwned(options) {
    return RequestHelper.get(this, 'runners', options);
  }

  edit(runnerId, attributes) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put(this, `runners/${rId}`, attributes);
  }

  remove(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.delete(this, `runners/${rId}`);
  }

  show(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}`);
  }

  showJobs(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}/jobs`);
  }
}

export default Runners;

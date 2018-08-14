import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Repositories extends BaseService {
  @api('<projectId>', '<from>', '<to>', { method: 'GET' })
  compare(projectId, from, to) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/compare`, {
      from,
      to,
    });
  }

  @api('<projectId>', { method: 'GET' })
  contributors(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/contributors`);
  }

  @api('<projectId>', '<sha>', { method: 'GET' })
  showArchive(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/archive`, {
      sha,
    });
  }

  @api('<projectId>', '<sha>', { method: 'GET' })
  showBlob(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}`);
  }

  @api('<projectId>', '<sha>', { method: 'GET' })
  showBlobRaw(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}/raw`);
  }

  @api('<projectId>', '<sha>', { options: true, method: 'GET' })
  tree(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tree`, options);
  }
}

export default Repositories;

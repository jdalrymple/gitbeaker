import { BaseService, RequestHelper } from '../infrastructure';

class Repositories extends BaseService {
  compare(projectId: ProjectId, from, to) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/compare`, {
      from,
      to,
    });
  }

  contributors(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/contributors`);
  }

  showArchive(projectId: ProjectId, { sha }) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/archive`, {
      sha,
    });
  }

  showBlob(projectId: ProjectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}`);
  }

  showBlobRaw(projectId: ProjectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}/raw`);
  }

  tree(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tree`, options);
  }
}

export default Repositories;

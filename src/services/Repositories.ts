import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class Repositories extends BaseService {
  compare(projectId: ProjectId, from: string, to: string) {
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

  showArchive(projectId: ProjectId, { sha }: { sha: string }) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/archive`, {
      sha,
    });
  }

  showBlob(projectId: ProjectId, sha: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}`);
  }

  showBlobRaw(projectId: ProjectId, sha: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}/raw`);
  }

  tree(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tree`, options);
  }
}

export default Repositories;

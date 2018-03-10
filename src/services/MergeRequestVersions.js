import { BaseService, RequestHelper } from '../infrastructure';

export class MergeRequestVersions extends BaseService {
  all(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mId}/versions`,
    );
  }

  show(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mId}/versions/${vId}`,
    );
  }
}

export default MergeRequestVersions;

import { BaseService, RequestHelper } from '../infrastructure';

class Wikis extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis`, options);
  }

  create(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/wikis`, options);
  }

  edit(projectId: ProjectId, slug, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/wikis/${slug}`, options);
  }

  show(projectId: ProjectId, slug) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis/${slug}`);
  }

  remove(projectId: ProjectId, slug) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/wikis/${slug}`);
  }
}

export default Wikis;

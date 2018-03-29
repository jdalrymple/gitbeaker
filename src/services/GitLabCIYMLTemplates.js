import { BaseService, RequestHelper } from '../infrastructure';

class GitLabCIYMLTemplates extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'templates/gitlab_ci_ymls', options);
  }

  show(ciymlId) {
    const gId = encodeURIComponent(ciymlId);

    return RequestHelper.post(this, `templates/gitlab_ci_ymls/${gId}`);
  }
}

export default GitLabCIYMLTemplates;

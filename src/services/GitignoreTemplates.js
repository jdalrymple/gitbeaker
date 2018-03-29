import { BaseService, RequestHelper } from '../infrastructure';

class GitignoreTemplates extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'templates/gitignores', options);
  }

  show(gitignoreId) {
    const gId = encodeURIComponent(gitignoreId);

    return RequestHelper.post(this, `templates/gitignores/${gId}`);
  }
}

export default GitignoreTemplates;

import BaseModel from './BaseModel';
import GroupProjects from './GroupProjects';
import ResourceAccessRequests from './ResourceAccessRequests';
import ResourceCustomAttributes from './ResourceCustomAttributes';
import ResourceMembers from './ResourceMembers';
import ResourceMilestones from './ResourceMilestones';
import { parse } from '../Utils';

class Groups extends BaseModel {
  constructor(...args) {
    super(...args);

    this.projects = new GroupProjects(...args);
    this.accessRequests = new ResourceAccessRequests('groups', ...args);
    this.customAttributes = new ResourceCustomAttributes('groups', ...args);
    this.members = new ResourceMembers('groups', ...args);
    this.milestones = new ResourceMilestones('groups', ...args);
  }

  all(options = {}) {
    return this.get('groups', options);
  }

  allSubgroups(groupId, options = {}) {
    const gId = parse(groupId);

    return this.get(`groups/${gId}/subgroups`, options);
  }

  show(groupId) {
    const gId = parse(groupId);

    return this.get(`groups/${gId}`);
  }

  create(options = {}) {
    return this.post('groups', options);
  }

  remove(groupId) {
    const gId = parse(groupId);

    return this.delete(`groups/${gId}`);
  }

  search(nameOrPath) {
    return this.get('groups', {
      search: nameOrPath,
    });
  }
}

export default Groups;

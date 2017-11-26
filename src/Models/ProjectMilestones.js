const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectMilestones extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/milestones`, options);
  }

  show(projectId, milestoneId) {
    const [pId, mId] = [projectId, milestoneId].map(Utils.parse);

    return this.get(`projects/${pId}/milestones/${mId}`);
  }

  add(projectId, title, options) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/milestones`, options);
  }

  update(projectId, milestoneId, options) {
    const [pId, mId] = [projectId, milestoneId].map(Utils.parse);

    return this.put(`projects/${pId}/milestones/${mId}`, options);
  }
}

module.exports = ProjectMilestones;

const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectMilestones extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    Utils.defaultPaging(options);

    return this.get(`projects/${pId}/milestones`, options);
  }

  show(projectId, milestoneId) {
    const [pId, mId] = [projectId, milestoneId].map(Utils.parse);

    return this.get(`projects/${pId}/milestones/${mId}`);
  }

  add(projectId, title, { description, due_date }) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/milestones`, {
      title,
      description,
      due_date,
    });
  }

  update(projectId, milestoneId, { title, description, due_date, state_event }) {
    const [pId, mId] = [projectId, milestoneId].map(Utils.parse);

    return this.put(`projects/${pId}/milestones/${mId}`, {
      title,
      description,
      due_date,
      state_event,
    });
  }
}

module.exports = ProjectMilestones;

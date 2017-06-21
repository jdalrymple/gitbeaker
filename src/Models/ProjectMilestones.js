const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectMilestones extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId) {
    console.log('DEPRECATED: milestone.list. Use milestone.all instead');
    return this.all(...arguments);
  }

  all(projectId, options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/milestones`, options);
  }

  show(projectId, milestoneId) {
    return this.get(`projects/${Utils.parse(projectId)}/milestones/${parseInt(milestoneId)}`);
  }

  add(projectId, title, description, due_date) {
    return this.post(`projects/${Utils.parse(projectId)}/milestones`, {
      id: Utils.parse(projectId),
      title,
      description,
      due_date
    });
  }

  update(projectId, milestoneId, title, description, due_date, state_event) {
    return this.put(`projects/${Utils.parse(projectId)}/milestones/${parseInt(milestoneId)}`, {
      id: Utils.parse(projectId),
      title,
      description,
      due_date,
      state_event
    });
  }
}

module.exports = ProjectMilestones;

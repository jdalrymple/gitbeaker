const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};

class ProjectAccessRequests extends BaseModel {
  constructor(...args) {
    super(...args);

    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/access_requests`);
  }

  request(projectId) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/access_requests`);
  }

  approve(projectId, userId, { access_level = 30 }) {
    const [pId, uId] = [projectId, userId].map(Utils.parse);

    return this.post(`projects/${pId}/access_requests/${uId}/approve`, { access_level });
  }

  deny(projectId, userId) {
    const [pId, uId] = [projectId, userId].map(Utils.parse);

    return this.delete(`projects/${pId}/access_requests/${uId}/approve`);
  }
}

module.exports = ProjectAccessRequests;

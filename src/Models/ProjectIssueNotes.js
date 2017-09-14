const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectIssueNotes extends BaseModel {
  all(projectId, issueIId, options = {}) {
    const [pId, iIId] = [projectId, issueIId].map(Utils.parse);

    return this.get(`projects/${pId}/issues/${iIId}/notes`, options);
  }

  create(projectId, issueIId, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');

    const [pId, iIId] = [projectId, issueIId].map(Utils.parse);

    return this.post(`projects/${pId}/issues/${iIId}/notes`, options);
  }

  edit(projectId, issueIId, noteId, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');

    const [pId, iIId, nId] = [projectId, issueIId, noteId].map(Utils.parse);

    return this.put(`projects/${pId}/issues/${iIId}/notes/${nId}`, options);
  }

  remove(projectId, issueIId, noteId) {
    const [pId, iIId, nId] = [projectId, issueIId, noteId].map(Utils.parse);

    return this.delete(`projects/${pId}/issues/${iIId}/notes/${nId}`);
  }

  show(projectId, issueIId, noteId) {
    const [pId, iIId, nId] = [projectId, issueIId, noteId].map(Utils.parse);

    return this.get(`projects/${pId}/issues/${iIId}/notes/${nId}`);
  }
}

module.exports = ProjectIssueNotes;

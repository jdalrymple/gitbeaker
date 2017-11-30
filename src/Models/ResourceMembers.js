const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ResourceMembers extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = Utils.parse(resourceId);

    return this.get(`${this.resourceType}/${rId}/members`);
  }

  add(resourceId, userId, accessLevel) {
    const [rId, uId] = [resourceId, userId].map(Utils.parse);

    return this.post(`${this.resourceType}/${rId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10),
    });
  }

  edit(resourceId, userId, accessLevel) {
    const [rId, uId] = [resourceId, userId].map(Utils.parse);

    return this.put(`${this.resourceType}/${rId}/members/${uId}`, {
      access_level: parseInt(accessLevel, 10),
    });
  }

  show(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(Utils.parse);

    return this.get(`${this.resourceType}/${rId}/members/${uId}`);
  }

  remove(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(Utils.parse);

    return this.delete(`${this.resourceType}/${rId}/members/${uId}`);
  }
}

module.exports = ResourceMembers;
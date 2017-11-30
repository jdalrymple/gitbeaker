const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};

class ResourceAccessRequests extends BaseModel {
  constructor(resourceType, ...args){
    super(...args);

    this.resourceType = resourceType;
    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  all(resourceId) {
    const rId = Utils.parse(resourceId);

    return this.get(`${this.resourceType}/${rId}/access_requests`);
  }

  request(resourceId) {
    const rId = Utils.parse(resourceId);

    return this.post(`${this.resourceType}/${rId}/access_requests`);
  }

  approve(resourceId, userId, { access_level = 30 }) {
    const [rId, uId] = [resourceId, userId].map(Utils.parse);

    return this.post(`${this.resourceType}/${rId}/access_requests/${uId}/approve`, { access_level });
  }

  deny(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(Utils.parse);

    return this.delete(`${this.resourceType}/${rId}/access_requests/${uId}/approve`);
  }
}

module.exports = ResourceAccessRequests;

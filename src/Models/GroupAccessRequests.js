const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};

class GroupAccessRequests extends BaseModel {
  constructor(...args) {
    super(...args);

    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  all(groupId) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/access_requests`);
  }

  request(groupId) {
    const gId = Utils.parse(groupId);

    return this.post(`groups/${gId}/access_requests`);
  }

  approve(groupId, userId, { access_level = 30 }) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.post(`groups/${gId}/access_requests/${uId}/approve`, { access_level });
  }

  deny(groupId, userId) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.delete(`groups/${gId}/access_requests/${uId}/approve`);
  }
}

module.exports = GroupAccessRequests;

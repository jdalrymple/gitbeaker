const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupMembers extends BaseModel {
  all(groupId) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/members`);
  }

  add(groupId, userId, accessLevel) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.post(`groups/${gId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10),
    });
  }

  edit(groupId, userId, accessLevel) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.put(`groups/${gId}/members/${uId}`, {
      access_level: parseInt(accessLevel, 10),
    });
  }

  show(groupId, userId) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.get(`groups/${gId}/members/${uId}`);
  }

  remove(groupId, userId) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.delete(`groups/${gId}/members/${uId}`);
  }
}

module.exports = GroupMembers;

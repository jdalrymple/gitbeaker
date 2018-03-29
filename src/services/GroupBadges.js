import { BaseService, RequestHelper } from '../infrastructure';

class GroupBadges extends BaseService {
  add(groupId, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/badges`, options);
  }

  all(groupId, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/badges`, options);
  }

  edit(groupId, badgeId, options) {
    const [gId, bId] = [groupId, badgeId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/badges/${bId}`, options);
  }

  preview(groupId, linkUrl, imageUrl) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/badges/render`, { linkUrl, imageUrl });
  }

  remove(groupId, badgeId) {
    const [gId, bId] = [groupId, badgeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/badges/${bId}`);
  }

  show(groupId, badgeId) {
    const [gId, bId] = [groupId, badgeId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/badges/${bId}`);
  }
}

export default GroupBadges;

import BaseModel from './BaseModel';
import { parse } from '../Utils';

class UserKeys extends BaseModel {
  add(userId, title, key) {
    const uId = parse(userId);

    return this.post(`users/${uId}/keys`, {
      title,
      key,
    });
  }

  addForCurrentUser(title, key) {
    return this.post('user/keys', {
      title,
      key,
    });
  }

  remove(userId, keyId) {
    const uId = parse(userId);
    const kId = parse(keyId);

    return this.delete(`users/${uId}/keys/${kId}`);
  }

  removeForCurrentUser(keyId) {
    const kId = parse(keyId);

    return this.delete(`user/keys/${kId}`);
  }

  all(userId) {
    const uId = parse(userId);

    return this.get(`users/${uId}/keys`);
  }

  allForCurrentUser() {
    return this.get('user/keys');
  }
}

export default UserKeys;

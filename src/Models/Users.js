import BaseModel from './BaseModel';
import { parse } from '../Utils';
import UserKeys from './UserKeys';
import ResourceCustomAttributes from './ResourceCustomAttributes';

class Users extends BaseModel {
  constructor(...args) {
    super(...args);

    this.customAttributes = new ResourceCustomAttributes('users', ...args);
    this.keys = new UserKeys(...args);
  }

  all(options = {}) {
    return this.get('users', options);
  }

  create(options = {}) {
    return this.post('users', options);
  }

  current() {
    return this.get('user');
  }

  session(email, password) {
    return this.post('session', {
      email,
      password,
    });
  }

  search(emailOrUsername) {
    return this.get('users', {
      search: emailOrUsername,
    });
  }

  show(userId) {
    const uId = parse(userId);

    return this.get(`users/${uId}`);
  }
}

export default Users;

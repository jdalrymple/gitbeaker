import { BaseService, RequestHelper } from '../infrastructure';
import { validateEventOptions } from './Events';

export class Users extends BaseService {
  all(options = {}) {
    return RequestHelper.get(this, 'users', options);
  }

  activities() {
    return RequestHelper.get(this, 'users/activities');
  }

  block(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/block`);
  }

  create(options = {}) {
    return RequestHelper.post(this, 'users', options);
  }

  current() {
    return RequestHelper.get(this, 'user');
  }

  events(userId, options) {
    validateEventOptions(options.action, options.targetType);

    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/events`, options);
  }

  session(email, password) {
    return RequestHelper.post(this, 'session', {
      email,
      password,
    });
  }

  search(emailOrUsername) {
    return RequestHelper.get(this, 'users', {
      search: emailOrUsername,
    });
  }

  show(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}`);
  }

  remove(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.delete(this, `users/${uId}`);
  }

  unblock(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/unblock`);
  }

  // Emails
  addEmail(email, userId) {
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';

    return RequestHelper.post(this, url, {
      email,
    });
  }

  allEmails(userId) {
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';

    return RequestHelper.get(this, url);
  }

  showEmail(emailId) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `users/emails/${eId}`);
  }

  removeEmail(emailId, userId) {
    const eId = encodeURIComponent(emailId);
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';

    return RequestHelper.delete(this, `${url}/${eId}`);
  }

  // Impersonation Tokens
  allImpersonationTokens(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens`);
  }

  createImpersonationToken(userId, name, scopes, expiresAt) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/impersonation_tokens`, {
      name,
      expiresAt,
      scopes,
    });
  }

  showImpersonationToken(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

  revokeImpersonationToken(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.delete(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

  // GPG Keys
  allGPGKeys(userId) {
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.get(this, url);
  }

  addGPGKey(title, key, userId) {
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.post(this, url, {
      title,
      key,
    });
  }

  showGPGKey(keyId, userId) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.get(this, `${url}/${kId}`);
  }

  removeGPGKey(keyId, userId) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.delete(this, `${url}/${kId}`);
  }

  // SSH Keys
  allKeys(userId) {
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'users/keys';

    return RequestHelper.get(this, url);
  }

  addKey(title, key, userId) {
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'users/keys';

    return RequestHelper.post(this, url, {
      title,
      key,
    });
  }

  showKey(keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `users/keys/${kId}`);
  }

  removeKey(keyId, userId) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'users/keys';

    return RequestHelper.delete(this, `${url}/${kId}`);
  }
}

export default Users;

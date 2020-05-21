import { generateKey } from 'openpgp';
import { UserGPGKeys } from '../../../src';

let service;

beforeEach(() => {
  service = new UserGPGKeys({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe.skip('UserGPGKeys.add', () => {
  it('should add a new gpg key to the user', async () => {
    const { publicKeyArmored } = await generateKey({
      userIds: [
        {
          name: 'Adding User',
        },
      ],
    });
    const keys = await service.add(publicKeyArmored);

    expect(keys).toBeObject();
    expect(keys).toContainKeys(['id', 'key', 'created_at']);
  });
});

describe.skip('UserGPGKeys.all', () => {
  it('should get all user gcp keys', async () => {
    const keys = await service.all();

    expect(keys).toBeInstanceOf(Array);
  });
});

describe.skip('UserGPGKeys.show', () => {
  it('should get one user gcp key', async () => {
    const { publicKeyArmored } = await generateKey({
      userIds: [
        {
          name: 'Showing User',
        },
      ],
    });
    const key = await service.add(publicKeyArmored);
    const keyshow = await service.show(key.id);

    expect(keyshow).toMatchObject(key);
  });
});

describe.skip('UserGPGKeys.remove', () => {
  it('should get one user gcp key', async () => {
    const { publicKeyArmored } = await generateKey({
      userIds: [
        {
          name: 'Removing User',
        },
      ],
    });
    const key = await service.add(publicKeyArmored);

    const { status } = await service.remove(key.id, { showExpanded: true });

    await expect(status).toBe(204);
  });
});

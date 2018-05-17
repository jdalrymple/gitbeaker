import { UsersBundle } from '../../../src';
import * as Services from '../../../src/services';

test('All the correct service keys are included in the users bundle', async () => {
  const bundle = new UsersBundle({ token: 'test' });
  const services = ['Users', 'UserEmails', 'UserImpersonationTokens', 'UserKeys', 'UserGPGKeys'];

  expect(bundle).toHaveProperty(services);
});

test('All the correct service instances are included in the users bundle', async () => {
  const bundle = new UsersBundle({ token: 'test' });

  Object.keys(bundle).forEach((key) => {
    expect(bundle[key]).instanceOf(Services[key]);
  });
});

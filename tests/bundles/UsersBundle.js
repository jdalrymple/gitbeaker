import { UsersBundle } from '../../src';
import Services from '../../src/services';

test('All the correct service keys are included in the users bundle', async () => {
  const bundle = new UsersBundle();
  const services = ['Users', 'UserEmails', 'UserImpersonationTokens', 'UserKeys', 'UserGPGKeys'];

  expect(bundle).toHaveProperty(services);
});

test('All the correct service instances are included in the users bundle', async () => {
  const bundle = new UsersBundle();

  Object.keys(bundle).forEach((key) => {
    expect(bundle[key]).instanceOf(Services[key]);
  });
});

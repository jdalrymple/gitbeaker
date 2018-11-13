import { UsersBundle } from '../../../src';
import * as Services from '../../../src/services';

test('All the correct service keys are included in the users bundle', async () => {
  const bundle = new UsersBundle({ token: 'test' });
  const services = [
  	'Users',
  	'UserEmails',
  	'UserCustomAttributes',
  	'UserImpersonationTokens',
  	'UserKeys',
  	'UserGPGKeys'
  ];

  expect(Object.keys(bundle)).toEqual(expect.arrayContaining(services));
});

test('All the correct service instances are included in the users bundle', async () => {
  const bundle = new UsersBundle({ token: 'test' });

  (Object.keys(bundle) as (keyof typeof bundle)[]).forEach((key) => {
    expect(bundle[key]).toBeInstanceOf(Services[key]);
  });
});

import 'jest-extended';
import { UsersBundle } from '../../../src';
import * as Services from '../../../src/services';

test('All the correct service keys are included in the users bundle', () => {
  const bundle: UsersBundle = new UsersBundle({ requesterFn: jest.fn(), token: 'test' });
  const services = [
    'Users',
    'UserEmails',
    'UserCustomAttributes',
    'UserImpersonationTokens',
    'UserSSHKeys',
    'UserGPGKeys',
  ];

  expect(Object.keys(bundle)).toIncludeAllMembers(services);
});

test('All the correct service instances are included in the users bundle', () => {
  const bundle = new UsersBundle({ requesterFn: jest.fn(), token: 'test' });

  (Object.keys(bundle) as (keyof typeof bundle)[]).forEach((key) => {
    expect(bundle[key]).toBeInstanceOf(Services[key]);
  });
});

import { jest } from '@jest/globals';

import 'jest-extended';
import 'jest-extended/all';

if (process.env.CI === 'true') {
  // Tests running in the CI runners tend to be more flaky.
  jest.retryTimes(3);
}

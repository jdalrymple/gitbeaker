import 'jest-extended';
import 'jest-extended/all';

import { expect } from '@jest/globals';
import type {MatcherFunction} from 'expect';

const toThrowWith: MatcherFunction<[cb:unknown]> = async function (expectCallbackOrPromiseReturn, matcherCallback) {
  const isFromReject = this && this.promise === 'rejects'; // See https://github.com/facebook/jest/pull/7621#issue-244312550
  if ((!expectCallbackOrPromiseReturn || typeof expectCallbackOrPromiseReturn !== 'function') && !isFromReject) {
    return {
      pass: false,
      message: () =>
        `Received value must be a function but instead "${expectCallbackOrPromiseReturn}" was found`,
    };
  }

  if ((!matcherCallback || typeof matcherCallback !== 'function')) {
    return {
      pass: false,
      message: () =>
        `matcherCallback value must be a function but instead "${matcherCallback}" was found`,
    };
  }


  let error;
  if (isFromReject) {
    error = expectCallbackOrPromiseReturn;
  } else {
    try {
      if (typeof expectCallbackOrPromiseReturn === 'function') {
        await expectCallbackOrPromiseReturn();
      }
    } catch (e) {
      error = e;
    }
  }

  await matcherCallback(error)

  if (!error) {
    return {
      pass: false,
      message: () => 'Expected the function to throw an error.\n' + "But it didn't throw anything.",
    };
  } else {
    return {
      pass: true,
      message: () => 'Expected the function not to throw an error"
    };
  }
}

expect.extend({
  toThrowWith,
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface AsymmetricMatchers {
      toThrowWith(cb: (error: Error) => void): void;
    }
    interface Matchers<R> {
      toThrowWith(cb: (error: Error) => void): R;
    }
  }
}

declare module "expect" {
  interface AsymmetricMatchers {
    toThrowWith(cb: (error: Error) => void): void;
  }
  interface Matchers<R> {
    toThrowWith(cb: (error: Error) => void): R;
  }
}
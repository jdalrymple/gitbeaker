import 'jest-extended'

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
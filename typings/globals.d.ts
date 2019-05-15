declare global {
  function encodeURIComponent(uriComponent: string | number | boolean): string;

  namespace NodeJS {
    interface Global {
      URL: typeof URL,
      URLSearchParams: typeof URLSearchParams
    }
  }
}

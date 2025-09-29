declare module 'xcase' {
  export function decamelizeKeys(obj: any): any;
  export function camelizeKeys(obj: any): any;
}

declare module 'rate-limiter-flexible' {
  export class RateLimiterMemory {
    constructor(opts: any);
    consume(key: string, points?: number): Promise<any>;
  }
  
  export class RateLimiterQueue {
    constructor(limiter: any, opts?: any);
    removeTokens(tokens: number, key?: string): Promise<any>;
  }
}

declare module 'picomatch-browser' {
  interface PicomatchOptions {
    dot?: boolean;
    noglobstar?: boolean;
    noext?: boolean;
    nocase?: boolean;
    nonegate?: boolean;
    matchBase?: boolean;
    capture?: boolean;
  }
  
  interface PicomatchReturn {
    isMatch: (str: string, pattern: string, options?: PicomatchOptions) => boolean;
  }
  
  const picomatch: PicomatchReturn;
  export = picomatch;
}
export class GitbeakerRequestError extends Error {
  readonly cause?: {
    description: string;
    request: Request;
    response: Response;
  };

  constructor(
    message: string,
    options?: {
      cause?: {
        description: string;
        request: Request;
        response: Response;
      };
    },
  ) {
    super(message, options);

    this.cause = options?.cause;
    this.name = 'GitbeakerRequestError';
  }
}

export class GitbeakerTimeoutError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'GitbeakerTimeoutError';
  }
}

export class GitbeakerRetryError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'GitbeakerRetryError';
  }
}

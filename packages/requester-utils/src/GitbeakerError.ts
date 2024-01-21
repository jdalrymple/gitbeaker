/* eslint-disable max-classes-per-file */
export class GitbeakerRequestError extends Error {
  constructor(
    message: string,
    options?: {
      cause: {
        description: string;
        request: Request;
        response: Response;
      };
    },
  ) {
    super(message, options);

    this.name = 'GitbeakerRequestError';
  }

  cause?: {
    description: string;
    request: Request;
    response: Response;
  };
}

export class GitbeakerTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitbeakerTimeoutError';
  }
}

export class GitbeakerRetryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitbeakerTimeoutError';
  }
}

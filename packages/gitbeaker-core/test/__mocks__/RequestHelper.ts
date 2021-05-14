const mockHelperFn = jest.fn();

export default {
  RequestHelper: {
    post: () => mockHelperFn,
    get: () => mockHelperFn,
    put: () => mockHelperFn,
    del: () => mockHelperFn,
    stream: mockHelperFn,
  },
};

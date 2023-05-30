export const makeMongoClientFactory = (): any => {
  const _startSession = {
    id: { id: { toUUID: () => "uuid" } },
    startSession: jest.fn(),
    startTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    endSession: jest.fn()
  };
  return {
    _startSession,
    startSession: () => _startSession
  };
};

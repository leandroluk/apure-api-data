// this is an example
global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
} as unknown as Console;

global.np = (value?: any) => (..._: any[]) => value;
global.throwFn = (message?: string) => { throw new Error(message); };


/**
 * This is a shortest NOOP function but with directly return value
 * @see https://www.techtarget.com/whatis/definition/no-op-no-operation
 * @param value 
 */
declare function np (value?: any): (..._: any[]) => any;

/**
 * This is a shortest method to throw a Error
 * @param message 
 */
declare function throwFn (message?: string): never;
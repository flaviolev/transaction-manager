const definedUndefined = 'undefined';

/**
 * Returns true if the given value is undefined or null.
 * @param objToCheck Value to be checked.
 */
export function isBlank<T>(objToCheck: T | null | undefined): boolean {
  return isUndefined(objToCheck) || objToCheck === null;
}

/**
 * Returns true if the given value is undefined.
 * @param objToCheck Value to be checked.
 */
export function isUndefined<T>(objToCheck: T | null | undefined): boolean {
  return (typeof (objToCheck) === definedUndefined);
}

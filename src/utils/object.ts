/**
 * setIn
 * - Mutates the first argument (target) by shallow-cloning along `path`
 * - Returns the updated top-level object (the same instance you pass in)
 *
 * Example usage:
 *   const newObj = { ...oldObj };
 *   setValueByPath(newObj, "address.postal", 123);
 *   // now newObj.address is a new object reference
 *   // but newObj.name might be the same reference if it wasn't changed
 */
export function setIn<T extends object>(
  target: T,
  path: string,
  value: any
): T {
  const parts = path.split(".");
  let current: any = target;

  // Walk down the object, shallow-cloning each level until we get
  // to the property *before* the last part in the path.
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];

    // current[key] might be an object or array, so we shallow-copy it
    // to avoid mutating the original
    current[key] = { ...current[key] };
    current = current[key];
  }

  // Set the final property
  const lastKey = parts[parts.length - 1];
  current[lastKey] = value;

  return target;
}

export function getIn<T extends object>(target: T, path: string): any {
  const parts = path.split(".");
  let current: any = target;

  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    current = current[key];
    if (current === undefined) {
      return undefined;
    }
  }

  return current;
}

export function createAt(path: string, value: any) {
  return setIn({}, path, value);
}

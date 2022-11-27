function isObject(obj: any) {
  return typeof obj === "object";
}

function isArray(arr: any) {
  return Array.isArray(arr);
}
function merge<T>(lhs: unknown, rhs: unknown): T {
  if (!isObject(lhs) && !isArray(lhs)) {
    if (isArray(rhs) || isObject(rhs)) {
      return deepCopy(rhs);
    }

    return rhs as T;
  }
  if (isArray(lhs)) {
    return deepMergeArrays(lhs, rhs);
  }
  return deepMergeObjects(lhs, rhs);
}

function deepCopy(item: any) {
  const result = isArray(item) ? [...item] : { ...item };

  if (isArray(result)) {
    return result;
  }

  for (let i of Object.keys(result)) {
    if (isArray(result[i]) || isObject(result[i])) {
      result[i] = deepCopy(result[i]);
    }
  }
  return result;
}
function deepMergeArrays<T>(arr1: any, arr2: any): T {
  return deepCopy([...arr1, ...arr2]);
}
function deepMergeObjects<T>(obj1: any, obj2: any): T {
  const result = deepCopy(obj1);
  for (let key of Object.keys(obj2)) {
    if (!result.hasOwnProperty(key)) {
      if (isObject(obj2[key]) || isArray(obj2[key])) {
        result[key] = deepCopy(obj2[key]);
        continue;
      }

      result[key] = obj2[key];
      continue;
    }
    if (isArray(obj2[key])) {
      result[key] = obj2[key];
    } else {
      result[key] = merge(result[key], obj2[key]);
    }
  }
  return result;
}

export default merge;

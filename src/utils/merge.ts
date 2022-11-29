function isObject(obj: any) {
  return typeof obj === "object";
}

export function merge<T>(lhs: unknown, rhs: unknown): T {
  if (!isObject(lhs) && !Array.isArray(lhs)) {
    if (Array.isArray(rhs) || isObject(rhs)) {
      return deepCopy(rhs);
    }

    return rhs as T;
  }
  if (Array.isArray(lhs)) {
    return deepMergeArrays(lhs, rhs);
  }
  return deepMergeObjects(lhs, rhs);
}

function deepCopy(item: any) {
  const result = Array.isArray(item) ? [...item] : { ...item };

  if (Array.isArray(result)) {
    return result;
  }

  for (const i of Object.keys(result)) {
    if (Array.isArray(result[i]) || isObject(result[i])) {
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
  for (const key of Object.keys(obj2)) {
    if (!result.hasOwnProperty(key)) {
      if (isObject(obj2[key]) || Array.isArray(obj2[key])) {
        result[key] = deepCopy(obj2[key]);
        continue;
      }

      result[key] = obj2[key];
      continue;
    }
    if (Array.isArray(obj2[key])) {
      result[key] = obj2[key];
    } else {
      result[key] = merge(result[key], obj2[key]);
    }
  }
  return result;
}



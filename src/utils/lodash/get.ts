export function get(obj: any, path: string | string[], defaultValue: any = undefined) {
  if (!obj || typeof obj !== "object") return defaultValue;

  const keys = Array.isArray(path) ? path : path.split(".");
  let result = obj;

  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }

  return result;
}

//// Usage
// const example = { a: { b: { c: 42 } } };

// console.log(get(example, "a.b.c")); // 42
// console.log(get(example, ["a", "b", "c"])); // 42
// console.log(get(example, "a.b.d", "default")); // "default"

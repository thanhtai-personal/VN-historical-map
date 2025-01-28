export function pickBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  if (!obj || typeof obj !== "object") throw new Error("Input must be an object");

  const result: Partial<T> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (predicate(value, key as keyof T)) {
      result[key as keyof T] = value;
    }
  });

  return result;
}

// // Usage Example
// const example = {
//   a: 1,
//   b: "hello",
//   c: 3,
//   d: null,
// };

// // Filter out keys with numeric values
// const filtered = pickBy(example, (value) => typeof value === "number");
// console.log(filtered); // { a: 1, c: 3 }

// // Filter out keys with truthy values
// const truthy = pickBy(example, (value) => Boolean(value));
// console.log(truthy); // { a:

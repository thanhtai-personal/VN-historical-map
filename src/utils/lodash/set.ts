export function set(obj: any, path: string | string[], value: any) {
  if (!obj || typeof obj !== "object") throw new Error("Target must be an object");

  const keys = Array.isArray(path) ? path : path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value; // Set the value
    } else {
      current[key] = current[key] || {}; // Ensure the intermediate key is an object
      current = current[key];
    }
  });

  return obj;
}

// // Usage
// const example = { a: { b: { c: 42 } } };

// set(example, "a.b.c", 100);
// console.log(example.a.b.c); // 100

// set(example, "a.d.e", "new");
// console.log(example.a.d.e); // "new"

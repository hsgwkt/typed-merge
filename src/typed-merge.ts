type Merge<T extends any[]> = {
  0: never;
  1: T[0];
  2: ((...t: T) => any) extends ((head: infer Head, ...tail: infer Tail) => any)
    ? Head & Merge<Tail>
    : never;
}[T['length'] extends 0 ? 0 : T['length'] extends 1 ? 1 : 2];

export default function <T extends any[]>(...data: T): Merge<T> {
  return data.filter(Boolean).reduce(merge_)
}

function merge_(value1, value2) {
  if (isPlainObject(value1) && isPlainObject(value2)) {
    const keys2 = Object.keys(value2)
    const keys1 = Object.keys(value1).filter(key => !keys2.includes(key))
    const entries1 = keys1.map(key => [key, clone(value1[key])])
    const entries2 = keys2.map(key => [key, merge_(value1[key], value2[key])])
    return Object.fromEntries(entries1.concat(entries2))
  }

  if (Array.isArray(value1) && Array.isArray(value2)) {
    return value1.concat(value2).map(clone)
  }

  return clone(value2 === undefined ? value1 : value2)
}

function clone(value) {
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.keys(value).map(key => [key, clone(value[key])]))
  }
  
  if (Array.isArray(value)) {
    return value.map(clone)
  }

  return value
}

type PlainObject = Record<PropertyKey, unknown>

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null &&
    (value.constructor === Object || !value.constructor)
}

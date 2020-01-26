declare type Merge<T extends any[]> = {
    0: never;
    1: T[0];
    2: ((...t: T) => any) extends ((head: infer Head, ...tail: infer Tail) => any) ? Head & Merge<Tail> : never;
}[T['length'] extends 0 ? 0 : T['length'] extends 1 ? 1 : 2];
export default function <T extends any[]>(...data: T): Merge<T>;
export {};

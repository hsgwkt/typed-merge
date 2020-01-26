# typed merge

```ts
import merge from 'typed-merge'

const result = merge(
  {
    a: [1]
  },
  {
    a: [2],
    b: false
  },
  {
    c: {
      d: 'hoge'
    }
  },
  {
    c: {
      e: null
    }
  }
)

console.log(result)
// =>
// {
//   a: [1, 2],
//   b: false
//   c: {
//     d: 'hoge',
//     e: null
//   }
// }

type D = typeof result.c.d
// D => 'hoge'
```

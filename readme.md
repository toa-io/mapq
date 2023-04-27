# MapQ

Object **Map**ping with JSONPath **q**eries.

`async? mapq(rules: object, source: object, context?: any): object`

Map the `source` object using the mapping `rules`.

If any transformation returns a `Promise`, the function returns a `Promise`.

## Rules

The `rules` object defines the structure of the resulting object and
contains [JSONPath](https://goessner.net/articles/JsonPath/) expressions that are applied to the
`source` object to obtain the corresponding value for each leaf.

```javascript
import mapq from 'mapq'

const rules = { foo: { bar: '$.a.b' } }
const source = { a: { b: 'hello' } }
const result = mapq(rules, source)

console.log(result) // { foo: { bar: 'hello' } }
```

## Transformations

Rules can include transformation functions that follow the
signature `(value: any, source: object, context: any) => any`. The `value` parameter corresponds to
the value of the node being transformed. The `source` and `context` are values that were originally
passed to the `map` function.

Transformations are defined by using an array `[string, function]`, where the first element is an
expression to get the value from the `source`, and the second is a transformation function.

```javascript
function increment (value) { return value + 1 }

const rules = { foo: ['$.bar', increment] }
const source = { bar: 1 }
const result = mapq(rules, source)

console.log(result) // { foo: 2 }
```

## Constants

If a leaf does not conform to either JSONPath expression or a transformation, then it is considered
as a desired value.

```javascript
const rules = {
  a: 1,
  b: 'hello',
  c: ['foo', 'bar']
}

const source = {}
const result = mapq(rules, source)

console.log(result) // { a: 1, b: 'hello', c: ['foo', 'bar'] }
```

## Arrays

Rules may form arrays.

```javascript
const rules = { foo: ['$.bar', '$.baz'] }
const source = { bar: 'hello', baz: 'world' }
const result = mapq(rules, source)

console.log(result) // { foo: ['hello', 'world'] }
```

Transformations are also supported for arrays.

```javascript
const transform = (value) => value + 10
const rules = { foo: [['$.bar', transform], ['$.baz', transform]] }
const source = { bar: 1, baz: 2 }
const result = mapq(rules, source)

console.log(result) // { foo: [11, 12] }
```

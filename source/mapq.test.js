'use strict'

const { timeout } = require('@toa.io/generic')

const mapq = require('../')

it('should be', async () => {
  expect(mapq).toBeInstanceOf(Function)
})

it('should return object', async () => {
  const result = mapq({}, {})

  expect(result).toStrictEqual({})
})

it('should ignore extra properties', async () => {
  const source = { foo: 'bar' }
  const result = mapq({}, source)

  expect(result).toStrictEqual({})
})

it('should set constants', async () => {
  const rules = {
    string: 'hello',
    number: 1,
    nested: {
      array: ['hello', 1]
    }
  }

  const result = mapq(rules, {})

  expect(result).toStrictEqual(rules)
})

describe('JSONPath', () => {
  it('should get values', async () => {
    const rules = { foo: '$.bar' }
    const source = { bar: 'baz' }
    const result = mapq(rules, source)

    expect(result).toStrictEqual({ foo: source.bar })
  })

  it('should get nested values', async () => {
    const rules = { foo: { bar: '$.one.two' } }
    const source = { one: { two: 'baz' } }
    const result = mapq(rules, source)

    expect(result).toStrictEqual({ foo: { bar: source.one.two } })
  })

  it('should set undefined if value not found', async () => {
    const rules = { foo: '$.bar' }
    const source = {}
    const result = mapq(rules, source)

    expect(result).toStrictEqual({ foo: undefined })
  })

  it('should map nested arrays of objects', async () => {
    const rules = { foo: ['$.bar', '$.baz'] }
    const source = { bar: 1, baz: 2 }

    const result = mapq(rules, source)

    expect(result).toStrictEqual({ foo: [1, 2] })
  })

  it('should map array of objects', async () => {
    const source = { foo: 1, bar: 2 }

    const rules = {
      baz: [
        {
          a: '$.foo',
          b: '$.bar'
        }
      ]
    }

    const result = mapq(rules, source)

    expect(result).toStrictEqual({
      baz: [{
        a: 1,
        b: 2
      }]
    })
  })

  it('should map to a value', async () => {
    const rules = '$.foo'
    const source = { foo: 'bar' }

    const result = mapq(rules, source)

    expect(result).toStrictEqual('bar')
  })

  it('should map from array', async () => {
    const rules = '$.[1]'
    const source = ['foo', 'bar']

    const result = mapq(rules, source)

    expect(result).toStrictEqual('bar')
  })

  it('should should map to array', async () => {
    const rules = ['$.foo', '$.bar']
    const source = { foo: 1, bar: 2 }

    const result = mapq(rules, source)

    expect(result).toStrictEqual([1, 2])
  })
})

describe('transformations', () => {
  it('should apply transformations', async () => {
    const transform = jest.fn((value) => value + 1)
    const source = { foo: 1 }
    const rules = { bar: ['$.foo', transform] }
    const result = mapq(rules, source)

    expect(result).toStrictEqual({ bar: 2 })
  })

  it('should apply async transformations', async () => {
    // noinspection JSCheckFunctionSignatures
    const transform = jest.fn(async (value) => {
      await timeout(1)

      return value + 1
    })

    const source = { foo: 1 }
    const rules = { bar: ['$.foo', transform] }
    const result = await mapq(rules, source)

    expect(result).toStrictEqual({ bar: 2 })
  })

  it('should apply transformations for missing keys', async () => {
    const transform = jest.fn(() => 1)
    const source = {}
    const rules = { bar: ['$.foo', transform] }
    const result = mapq(rules, source)

    expect(result).toStrictEqual({ bar: 1 })
  })

  it('should pass source and context to transformation', async () => {
    const transform = jest.fn(() => 1)
    const source = { foo: 'baz' }
    const rules = { bar: ['$.foo', transform] }
    const context = 'hello'

    mapq(rules, source, context)

    expect(transform).toHaveBeenCalledWith(source.foo, source, context)
  })

  it('should apply array of transformations', async () => {
    const transform = (value) => value + 1
    const source = { foo: 1, bar: 2 }
    const rules = { baz: [['$.foo', transform], ['$.bar', transform]] }

    const result = mapq(rules, source)

    expect(result).toStrictEqual({ baz: [2, 3] })
  })
})

'use strict'

const jsonpath = require('./jsonpath')

it('should find property', async () => {
  const object = { name: 'foo' }
  const result = jsonpath(object, '$.name')

  expect(result[0]).toStrictEqual('foo')
})

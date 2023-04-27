'use strict'

const jsonpath = require('./goessner/jsonpath')

/**
 * @param {mapq.rules} rule
 * @return {boolean}
 */
function test (rule) {
  return typeof rule === 'string' && rule[0] === '$'
}

/**
 * @param {string} expression
 * @param {mapq.Scope} scope
 * @return {any}
 */
function apply (expression, scope) {
  const values = jsonpath(scope.source, expression)

  if (Array.isArray(values)) return values[0]
  else return undefined
}

exports.test = test
exports.apply = apply

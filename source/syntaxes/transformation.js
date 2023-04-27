'use strict'

const expression = require('./expression')

/**
 * @param {mapq.rules} rule
 * @return {boolean}
 */
function test (rule) {
  if (!Array.isArray(rule) || rule.length !== 2) return false

  const [string, transform] = rule

  if (!expression.test(string)) return false
  if (typeof transform !== 'function') return false

  return typeof transform === 'function'
}

/**
 * @param {[string, function]}
 * @param {mapq.Scope} scope
 * @return {any}
 */
function apply ([string, transform], scope) {
  const value = expression.apply(string, scope)

  return transform(value, scope.source, scope.context)
}

exports.test = test
exports.apply = apply

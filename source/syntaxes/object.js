'use strict'

const { set } = require('../set')

function test (rule) {
  return typeof rule === 'object' && !Array.isArray(rule) && rule !== null
}

/**
 * @param {any[]} rules
 * @param {mapq.Scope} scope
 * @return {any}
 */
function apply (rules, scope) {
  const object = {}

  for (const [key, rule] of Object.entries(rules)) {
    if (typeof rule === 'object' && !Array.isArray(rule)) object[key] = scope.apply(rule, scope)
    else {
      const value = scope.apply(rule, scope)

      set(object, key, value, scope.promises)
    }
  }

  return object
}

exports.test = test
exports.apply = apply

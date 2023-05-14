'use strict'

function test (rule) {
  return typeof rule === 'object' && !Array.isArray(rule) && rule !== null
}

/**
 * @param {any[]} values
 * @param {mapq.Scope} scope
 * @return {any}
 */
function apply (values, scope) {
  const result = {}
  for (const key of Object.keys(values)) {
    result[key] = scope.apply(values[key])
  }
  return result
}

exports.test = test
exports.apply = apply

'use strict'

const transformation = require('./transformation')

/**
 * @param {rules} rule
 * @return {boolean}
 */
function test (rule) {
  return !(!Array.isArray(rule) || transformation.test(rule))
}

/**
 * @param {any[]} values
 * @param {mapq.Scope} scope
 * @return {any}
 */
function apply (values, scope) {
  return values.map((value) => scope.apply(value))
}

exports.test = test
exports.apply = apply

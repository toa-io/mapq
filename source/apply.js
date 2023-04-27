'use strict'

const syntaxes = require('./syntaxes')

/**
 * @param {mapq.rules} rule
 * @param {mapq.Scope} [scope]
 * @returns {any}
 */
function apply (rule, scope = this) {
  for (const { test, apply } of syntaxes) {
    if (test(rule)) return apply(rule, scope)
  }

  // rule value is a constant
  return rule
}

exports.apply = apply

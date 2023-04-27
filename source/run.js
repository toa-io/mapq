'use strict'

const { apply } = require('./apply')
const { set } = require('./set')

/**
 * @param {mapq.rules} rules
 * @param {object} target
 * @param {mapq.Scope} scope
 * @returns {object | Promise<object>}
 */
function run (rules, target, scope) {
  const entries = Object.entries(rules)

  for (const [key, rule] of entries) {
    if (typeof rule === 'object' && !Array.isArray(rule)) run(rule, target[key] = {}, scope)
    else {
      const value = apply(rule, scope)

      set(target, key, value, scope.promises)
    }
  }
}

exports.run = run

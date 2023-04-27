'use strict'

const { when } = require('./when')
const syntaxes = require('./syntaxes')

/**
 * @param {object} rules
 * @param {object} source
 * @param {object} [context]
 * @returns {object | Promise<object>}
 */
function mapx (rules, source, context) {
  const target = {}
  const promises = []

  /** @type {mapx.Scope} */
  const scope = { source, context, promises, apply }

  run(rules, target, scope)

  if (promises.length > 0) return when(promises, target)
  else return target
}

/**
 * @param {mapx.rules} rules
 * @param {object} target
 * @param {mapx.Scope} scope
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

/**
 * @param {mapx.rules} rule
 * @param {mapx.Scope} [scope]
 * @returns {any}
 */
function apply (rule, scope = this) {
  for (const { test, apply } of syntaxes) {
    if (test(rule)) return apply(rule, scope)
  }

  // rule value is a constant
  return rule
}

/**
 * @param {object} target
 * @param {string} key
 * @param {any} value
 * @param {Promise<any>[]} promises
 */
function set (target, key, value, promises) {
  target[key] = value

  if (value instanceof Promise) {
    promises.push(value)
    value.then((value) => (target[key] = value))
  }
}

module.exports = mapx

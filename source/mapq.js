'use strict'

const { apply } = require('./apply')
const { when } = require('./when')

/**
 * @param {mapq.rules} rules
 * @param {object} source
 * @param {object} [context]
 * @returns {object | Promise<object>}
 */
function mapq (rules, source, context) {
  const promises = []

  /** @type {mapq.Scope} */
  const scope = { source, context, promises, apply }
  const target = apply(rules, scope)

  if (promises.length > 0) return when(promises, target)
  else return target
}

module.exports = mapq

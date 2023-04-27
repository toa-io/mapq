'use strict'

const { run } = require('./run')
const { apply } = require('./apply')
const { when } = require('./when')

/**
 * @param {object} rules
 * @param {object} source
 * @param {object} [context]
 * @returns {object | Promise<object>}
 */
function mapq (rules, source, context) {
  const target = {}
  const promises = []

  /** @type {mapq.Scope} */
  const scope = { source, context, promises, apply }

  run(rules, target, scope)

  if (promises.length > 0) return when(promises, target)
  else return target
}

module.exports = mapq

'use strict'

/**
 * @param {Promise<void>[]} promises
 * @param {object} target
 * @return {Promise<object>}
 */
async function when (promises, target) {
  await Promise.all(promises)

  return target
}

exports.when = when

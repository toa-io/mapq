'use strict'

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

exports.set = set

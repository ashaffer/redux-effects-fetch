/**
 * Imports
 */

import fetch from 'isomorphic-fetch'

/**
 * Fetch middleware
 */

function fetchMiddleware ({dispatch, getState}) {
  return next => effect =>
    effect.type === 'FETCH'
      ? fetch(effect.url, effect.params).then(checkStatus).then(deserialize, deserialize)
      : next(effect)
}

/**
 * Deserialize the request body
 */

function deserialize (res) {
  return res.headers.get('Content-Type') === 'application/json'
    ? res.json()
    : res.text()
}

/**
 * Check the status and reject the promise if it's not in the 200 range
 */

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    throw res
  }
}

/**
 * Exports
 */

export default fetchMiddleware

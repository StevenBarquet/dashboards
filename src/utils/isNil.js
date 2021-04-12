/**
 * check whether a value is `null` or `undefined`.
 * @param {*} val
 * @return {boolean} boolean
 */
function isNil(val) {
  return val === undefined || val === null
}
export default isNil

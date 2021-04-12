/**
 * Loop through object properties and if an object has at least one property, then it will return `false`, or `true` if not.
 * @param {{}} obj
 * @return {boolean} boolean
 */
function isEmptyObj(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }
  return true
}
export default isEmptyObj

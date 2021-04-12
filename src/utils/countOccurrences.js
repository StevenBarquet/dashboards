/**
 * Counts the occurrences of a value in an array. Ex: `countOccurrences([1, 1, 2, 1, 2, 3], 1);` //3
 * @param {[]} arr
 * @param {*} valueToFind
 * @return {number} number
 */
function uniqueElements(arr) {
  return [...new Set(arr)]
}
export default uniqueElements

/**
 * Get all indexes of a value in an array, which returns an empty array, in case this value is not included in it. Ex:`indexOfAll([1, 2, 3, 1, 2, 3], 1);` // [0,3] `indexOfAll([1, 2, 3], 4);` // [ ]
 * @param {[]} arr
 * @param {*} valueToFind
 * @return {number[]} number [ ]
 */
function indexOfAllFound(arr, valueToFind) {
  return arr.reduce(
    (acc, el, i) => (el === valueToFind ? [...acc, i] : acc),
    []
  )
}
export default indexOfAllFound

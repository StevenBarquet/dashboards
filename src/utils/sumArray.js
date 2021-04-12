/**
 * Find the sum of two or more numbers or arrays. Ex: `sum(1, 2, 3, 4);`// 10 `sum(...[1, 2, 3, 4]);` // 10
 * @param {number} arr
 * @return {number} number
 */
function sumArray(...arr) {
  return [...arr].reduce((acc, val) => acc + val, 0)
}
export default sumArray

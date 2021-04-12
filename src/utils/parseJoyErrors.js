/**
 * @description Build an object from a joy validation
 * @param {Array<Object>} array
 * @returns {Object} Object
 */
const parseJoyErrors = array => {
  const errors = {}
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    errors[item.context.key] = {
      message: item.message,
      type: item.type,
    }
  }
  return errors
}

export default parseJoyErrors

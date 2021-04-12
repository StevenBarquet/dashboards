import StatusCodeMessage from 'src/globalConfig/messages/statusCodeMessages'
import defaultObject from 'src/globalConfig/defaultHttpResponse'
/**
 * @description Based a response launch a message, modal, notification
 * @param {Object} param0
 */
export default ({ response, onSuccess, level }) => {
  const statusCodeMessageObject =
    StatusCodeMessage[response.status] || defaultObject
  return {
    ...statusCodeMessageObject,
    level: level || statusCodeMessageObject.level,
    message: onSuccess || statusCodeMessageObject.message,
  }
}

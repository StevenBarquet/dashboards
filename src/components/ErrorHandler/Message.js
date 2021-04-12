import { message } from 'antd'
import { closeNotification } from 'src/actions/errorHandler'

const Message = (config, dispatch) => {
  const { level } = config
  switch (level) {
    case 'success': {
      message.success({
        content: config.message,
        onClose: () => dispatch(closeNotification()),
      })
      break
    }
    case 'warning': {
      message.warning({
        content: config.message,
        onClose: () => dispatch(closeNotification()),
      })
      break
    }
    case 'error': {
      message.error({
        content: config.message,
        onClose: () => dispatch(closeNotification()),
      })
      break
    }
    case 'info': {
      message.info({
        content: config.message,
        onClose: () => dispatch(closeNotification()),
      })
      break
    }

    default:
      return null
  }
}
export default Message

import React from 'react'
import { notification, Icon } from 'antd'
import { closeNotification } from 'src/actions/errorHandler'

const Notification = (config, dispatch) => {
  const { level } = config
  switch (level) {
    case 'success': {
      notification.open({
        message: config.title,
        description: config.message,
        onClose: () => dispatch(closeNotification()),
        icon: <Icon type="check-circle" className="text-success" />,
      })
      break
    }
    case 'warning': {
      notification.open({
        message: config.title,
        description: config.message,
        onClose: () => dispatch(closeNotification()),
        icon: <Icon type="warning" className="text-warning" />,
      })
      break
    }
    case 'error': {
      notification.open({
        message: config.title,
        description: config.message,
        onClose: () => dispatch(closeNotification()),
        icon: <Icon type="close-circle" className="text-error" />,
      })
      break
    }
    case 'info': {
      notification.open({
        message: config.title,
        description: config.message,
        onClose: () => dispatch(closeNotification()),
        icon: <Icon type="info-circle" className="text-info" />,
      })
      break
    }

    default:
      return null
  }
}

export default Notification

import React from 'react'
import { Modal as ModalAntd } from 'antd'
import { closeNotification } from 'src/actions/errorHandler'

const closeHandler = dispatch => {
  dispatch(closeNotification())
}
const Modal = (config, dispatch) => {
  const { level } = config
  switch (level) {
    case 'success': {
      ModalAntd.success({
        title: config.title,
        content: (
          <div>
            <p>{config.message}</p>
          </div>
        ),
        afterClose: closeHandler(dispatch),
      })
      break
    }
    case 'warning': {
      ModalAntd.warning({
        title: config.title,
        content: config.message,
        afterClose: closeHandler(dispatch),
      })
      break
    }
    case 'error': {
      ModalAntd.error({
        title: config.title,
        content: (
          <div>
            <p>{config.message}</p>
          </div>
        ),
        afterClose: closeHandler(dispatch),
      })
      break
    }
    case 'info': {
      ModalAntd.info({
        title: config.title,
        content: (
          <div>
            <p>{config.message}</p>
          </div>
        ),
        afterClose: closeHandler(dispatch),
      })
      break
    }

    default:
      return null
  }
}

export default Modal

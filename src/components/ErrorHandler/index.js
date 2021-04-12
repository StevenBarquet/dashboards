/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Message from './Message'
import Modal from './Modal'
import Notification from './Notification'

const ManageErrors = (config, dispatch) => {
  const { type } = config
  switch (type) {
    case 'modal': {
      Modal(config, dispatch)
      break
    }
    case 'message': {
      Message(config, dispatch)
      break
    }
    case 'notification': {
      Notification(config, dispatch)
      break
    }
    default:
      return null
  }
}

const Index = props => {
  const { errorHandler } = props
  const [__error, setError] = useState(errorHandler)
  const dispatch = useDispatch()

  useEffect(() => {
    const { open: openedState } = __error
    const { open: openedProps } = errorHandler

    if (openedProps !== openedState) {
      setError(errorHandler)
      ManageErrors(errorHandler, dispatch)
    }
  })
  return (
    <div>
      {/* Here there is nothing cause antd launch messages, modals, notifications, calling a functions */}
    </div>
  )
}

export default Index

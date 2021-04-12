import {
  CLOSE_HANDLER,
  LAUNCH_MESSAGE,
  LAUNCH_MODAL,
  LAUNCH_NOTIFY,
} from './actionTypes'

export const closeNotification = () => ({
  type: CLOSE_HANDLER,
})
/**
 * New Messages
 */
export const launchMessage = payload => ({
  type: LAUNCH_MESSAGE,
  payload,
})
export const launchModal = payload => ({
  type: LAUNCH_MODAL,
  payload,
})
export const launchNotify = payload => {
  return {
    type: LAUNCH_NOTIFY,
    payload,
  }
}

import {
  GET_SESSION,
  CLEAR_SESSION,
  GET_ALL_DASH,
} from 'src/actions/actionTypes'
import messageTypes from 'src/globalConfig/messageTypes' // GLOBAL MESSAGE TYPES
import * as setMessage from 'src/actions/errorHandler'
import * as Spinner from 'src/actions/spinner'
import messageLevels from 'src/globalConfig/messageLevels'
import axios from 'axios'
import { NewClientHttpRequest } from 'src/utils/httpService'
import Router from 'next/router'

const serverURL = 'http://localhost:3001'
const securityUrl = 'http://localhost:3001/api/login/getAuth'

function handleAuth(errMssg, dispatch) {
  const messageError = {
    type: messageTypes.MODAL,
    level: messageLevels.ERROR,
    message: errMssg,
  }
  dispatch(setMessage.launchModal(messageError))
  Router.push('/Login')
  return false
}

function handleError(errMssg, dispatch) {
  const messageError = {
    type: messageTypes.MODAL,
    level: messageLevels.ERROR,
    message: errMssg,
  }
  dispatch(setMessage.launchModal(messageError))
}

function getErrorMessage(error) {
  const errMssg =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : 'Servidor sin conexión o error en su internet'

  return errMssg
}

function getSuccessMessage(success) {
  const errMssg =
    success && success.data && success.data.message
      ? success.data.message
      : 'Solicitud exitosa'

  return errMssg
}

function getUserInfo(response, dispatch) {
  const sessionData = response.sessionData.data.body
  dispatch({ type: GET_SESSION, payload: sessionData })
}

// -------------------------------------------REQUESTS------------------------
export const logIn = logData => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const stringData = JSON.stringify(logData)
    const logData64 = Buffer.from(stringData).toString('base64')
    await axios(`${serverURL}/api/login/setAuth?data=${logData64}`, {
      method: 'get',
      withCredentials: true,
    })

    dispatch(Spinner.loaded())
    return true
  } catch (error) {
    dispatch(Spinner.loaded())
    const errMssg = getErrorMessage(error)

    handleError(errMssg, dispatch)
    return false
  }
}

export const logOut = () => async dispatch => {
  dispatch(Spinner.loading())
  try {
    await NewClientHttpRequest({
      path: '/api/login/offAuth',
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    dispatch({ type: CLEAR_SESSION })
    return true
  } catch (error) {
    dispatch(Spinner.loaded())
    const errMssg = getErrorMessage(error)

    handleError(errMssg, dispatch)
    return false
  }
}

export const example = () => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: '/api/consulta/getAll',
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_ALL_DASH,
      payload: success.data.body,
    })
    return true
  } catch (error) {
    dispatch(Spinner.loaded())
    const errMssg = getErrorMessage(error)

    if (errMssg === 'Token expired') {
      return handleAuth(errMssg, dispatch)
    }
    handleError(errMssg, dispatch)
    return false
  }
}

export const recoverMail = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      path: '/api/recovery/search',
      urlBase: serverURL,
      method: 'post',
      data: form,
    })

    dispatch(Spinner.loaded())
    const successMssg = getSuccessMessage(success)
    const messageSuccess = {
      type: messageTypes.MODAL,
      level: messageLevels.SUCCESS,
      message: successMssg,
    }
    dispatch(setMessage.launchModal(messageSuccess))
    return true
  } catch (error) {
    dispatch(Spinner.loaded())
    const errMssg = getErrorMessage(error)

    handleError(errMssg, dispatch)
    return false
  }
}

export const recoverPass = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      path: '/api/recovery/recoveryPassword',
      urlBase: serverURL,
      method: 'post',
      data: form,
    })

    dispatch(Spinner.loaded())
    const successMssg = getSuccessMessage(success)
    const messageSuccess = {
      type: messageTypes.MESSAGE,
      level: messageLevels.SUCCESS,
      message: successMssg,
    }
    dispatch(setMessage.launchModal(messageSuccess))
    Router.push('/Login')
    return true
  } catch (error) {
    dispatch(Spinner.loaded())
    const errMssg = getErrorMessage(error)

    handleError(errMssg, dispatch)
    return false
  }
}

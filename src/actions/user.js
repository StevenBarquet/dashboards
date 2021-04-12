/* eslint-disable import/prefer-default-export */
import {
  GET_ALL_USERS,
  TOOGLE_CREATE,
  UPDATE_USER,
  RESET_FORM,
  GET_ONE_USER,
  FILTER_USER,
  GET_SESSION,
} from 'src/actions/actionTypes'
import Router from 'next/router'
import * as setMessage from 'src/actions/errorHandler'
import * as Spinner from 'src/actions/spinner'
import messageTypes from 'src/globalConfig/messageTypes' // GLOBAL MESSAGE TYPES
import messageLevels from 'src/globalConfig/messageLevels'
import { NewClientHttpRequest } from 'src/utils/httpService'

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

function getUserInfo(response, dispatch) {
  const sessionData = response.sessionData.data.body
  dispatch({ type: GET_SESSION, payload: sessionData })
}

function getErrorMessage(error) {
  const errMssg =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : 'Servidor sin conexión o error en su internet'

  return errMssg
}

const serverURL = 'http://localhost:3001'
const securityUrl = 'http://localhost:3001/api/login/getAuth'

export const createUser = (form, initialState) => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/createUser`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: RESET_FORM,
      payload: initialState,
    })
    Router.push('/OperationSearch')
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

export const getUsers = () => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/getAll`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_ALL_USERS,
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

export const filterUser = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/getFilter`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: FILTER_USER,
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

export const getOneUser = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/getOne?id=${form}`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: GET_ONE_USER,
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

export const updateUser = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/update`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: RESET_FORM,
      payload: {},
    })
    Router.push('/OperationSearch')
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

export const removeUser = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/remove`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
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

export const toogleCreate = () => ({
  type: TOOGLE_CREATE,
})

export const toogleUpdate = () => ({
  type: UPDATE_USER,
})

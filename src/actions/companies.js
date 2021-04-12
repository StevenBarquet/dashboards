import * as setMessage from 'src/actions/errorHandler'
import * as Spinner from 'src/actions/spinner'
import messageTypes from 'src/globalConfig/messageTypes' // GLOBAL MESSAGE TYPES
import messageLevels from 'src/globalConfig/messageLevels'
import { NewClientHttpRequest } from 'src/utils/httpService'
import Router from 'next/router'
import {
  GET_COMPANIES_DASH,
  GET_GROUPS_DASH,
  TOOGLE_CREATE_COMP,
  TOOGLE_UPDATE_COMP,
  FILTER_COMPANY,
  RESET_FORM,
  FILTER_GROUPS,
  TOOGLE_CREATE,
  GET_ONE_COMPANY,
  GET_ONE_GROUP,
  GET_SESSION,
} from './actionTypes'

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

function getUserInfo(response, dispatch) {
  const sessionData = response.sessionData.data.body
  dispatch({ type: GET_SESSION, payload: sessionData })
}

// -------------------------------------------REQUESTS------------------------
export const getCompanies = () => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: '/api/company/getAll',
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_COMPANIES_DASH,
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

export const toogleCreateComp = () => ({
  type: TOOGLE_CREATE_COMP,
})
export const toogleUpdateComp = () => ({
  type: TOOGLE_UPDATE_COMP,
})

// Get all the groups in the DB
export const getGroups = () => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/group/getAll`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: GET_GROUPS_DASH,
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

// Create a company
export const createCompany = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/company/createCompany`,
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

export const filterCompany = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/company/getFilter`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: FILTER_COMPANY,
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

export const filterGroup = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/group/getFilter`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: FILTER_GROUPS,
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

// Create a group
export const createGroup = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/group/createGroup`,
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

export const removeGroup = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/group/remove`,
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

export const removeCompany = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/company/remove`,
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

export const getOneGroup = id => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/group/getOne?id=${id}`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: GET_ONE_GROUP,
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

export const getOneCompany = id => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/company/getOne?id=${id}`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: GET_ONE_COMPANY,
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

export const updateGroup = (
  id,
  onToogleCreate,
  initialState
) => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/group/update`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: id,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: GET_ONE_GROUP,
      payload: success.data.body,
    })
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({ type: RESET_FORM, payload: initialState })
    onToogleCreate()
    Router.push('/SearchGroup')
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

export const updateCompany = (
  id,
  onToogleCreate,
  initialState
) => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/company/update`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: id,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({
      type: GET_ONE_COMPANY,
      payload: success.data.body,
    })
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({ type: RESET_FORM, payload: initialState })
    onToogleCreate()
    Router.push('/SearchGroup')
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

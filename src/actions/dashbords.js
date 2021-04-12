/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_DASHBOARD,
  TOOGLE_CREATE_DASH,
  TOOGLE_UPDATE_DASH,
  GET_ONE_DASHBOARD,
  GET_USERS_DASH,
  GET_ALL_DASH,
  FILTER_DASHBOARD,
  RESET_DASH,
  GET_SESSION,
} from 'src/actions/actionTypes'
import * as setMessage from 'src/actions/errorHandler'
import * as Spinner from 'src/actions/spinner'
import messageTypes from 'src/globalConfig/messageTypes' // GLOBAL MESSAGE TYPES
import messageLevels from 'src/globalConfig/messageLevels'
import Router from 'next/router'
import { NewClientHttpRequest } from 'src/utils/httpService'

function querysToString(allGraphs) {
  const newGraphs = allGraphs.map(graph => ({
    ...graph,
    query: JSON.stringify(graph.query),
    cols: parseInt(graph.cols, 10),
  }))
  return newGraphs
}

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

// ---------------------------------------------------------------------------

export const getDashboard = () => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: '/api/dashboard/getAll',
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

export const createGenData = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/dashboard/createDashboard`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: CREATE_DASHBOARD,
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

export const updateGenData = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/dashboard/update`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: CREATE_DASHBOARD,
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

export const getAllGraphs = id => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const id_dashboard = { id_dashboard: id }
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/graph/getFilterGraph`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: id_dashboard,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch)
    const { data } = success
    const { body } = data
    const parseResponse = {
      ...body,
      graphs: querysToString(body.getGraph),
    }
    return parseResponse
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

export const crateGraph = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/graph/crateGraph`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    return success.data.body
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

export const editGraph = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/graph/updateGraph`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    return success.data.body
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

export const deleteGraph = id => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const id_graph = { id }
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/graph/deleteGraph`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: id_graph,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    return success.data.body
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

export const editOrderIndex = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/graph/editOrderIndex`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    return success.data.body
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
  type: TOOGLE_CREATE_DASH,
})

export const toogleUpdate = () => ({
  type: TOOGLE_UPDATE_DASH,
})

export const getOneDashboard = id => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/dashboard/getOne?id=${id}`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_ONE_DASHBOARD,
      payload: success.data.body,
    })
    dispatch(setMessage.launchMessage(success.Message))
    Router.push('/HomeDashboard')
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

export const getOneDashboardRead = id => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/dashboard/getOne?id=${id}`,
      urlBase: serverURL,
      securityUrl,
      method: 'GET',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_ONE_DASHBOARD,
      payload: success.data.body,
    })
    dispatch(setMessage.launchMessage(success.Message))
    Router.push('/ClientDashboard')
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
      method: 'POST',
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_USERS_DASH,
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

export const filterDashboard = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/dashboard/getFilter`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: FILTER_DASHBOARD,
      payload: success.data.body,
    })
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

export const getUsersByCompany = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/users/userSerch`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch({
      type: GET_USERS_DASH,
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

export const cretateVisualization = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/visualization/createVisualization`,
      urlBase: serverURL,
      securityUrl,
      method: 'POST',
      data: form,
    })

    dispatch(Spinner.loaded())
    getUserInfo(success, dispatch) // always get user data
    dispatch(setMessage.launchMessage(success.Message))
    dispatch({ type: RESET_DASH })
    dispatch({ type: TOOGLE_CREATE_DASH })
    Router.push('/SearchDashboard')
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

export const removeDashboard = form => async dispatch => {
  dispatch(Spinner.loading())
  try {
    const success = await NewClientHttpRequest({
      withCredentials: true,
      path: `/api/dashboard/remove`,
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

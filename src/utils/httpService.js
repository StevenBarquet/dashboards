/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'
import AxiosConfig from 'src/globalConfig/axiosConfig'
import buildUrlBase from 'src/utils/buildUrlBase'
import setMessage from 'src/utils/setMessage'
import { SECURE } from '../globalConfig/secureSettings'
import { encrypt, decrypt } from './secure'
/**
 * @description SET @axios CONFIG, SEND HTTP REQUEST, WRAP RESPONSE
 * @param {Object} options
 * @example
 * {
 *  baseUrl: [if have an external baseurl]
 *  method: [POST, GET, PUT, DELETE]
 *  path: /foo/bar/id
 *  data: {}
 *  headers: {}
 *  message: {
 *   level: [error, info, success, warning],
 *   onSuccess: A success message
 *  }
 * }
 */
export const ClientHttpRequest = async options => {
  const { message, params, method, path, urlBase, withOutCredentials } = options
  /**
   * BFF ENCRYPT AND DECRYPT COOKIES AND REQUEST BODY
   * ANOTHER BASEURL DON´T ACCEPT THIS
   * @returns {Boolean}
   */
  const isSecure = () => !withOutCredentials && !urlBase && SECURE
  /**
   * IF REQUEST RESPONSE CONTAINS AN ENCRYPTED BODY
   * @returns {Boolean}
   */
  const validResponse = obj =>
    obj.data && obj.data.data && obj.data.data.includes(':')

  /**
   * BUILD URL WITH ENVIRONMENTS AND SETTINGS WITH EXTERNAL URLBASE
   */
  const url = buildUrlBase(path, params, method, urlBase)
  /**
   * AXIOS HTTONLY SETTINGS
   */
  const aditionalSettings = withOutCredentials ? '' : AxiosConfig

  let data = params

  if (isSecure()) {
    data = { data: encrypt(params) } // ENCRYPT REQUEST BODY
  }
  /**
   * BUILD AXIOS OPTIONS
   */
  const settings = {
    ...aditionalSettings,
    headers: {
      ...options.headers,
    },
  }
  try {
    /**
     * SWITCH REQUEST METHOD
     * AXIOS METHODS MUST BE SEPARATED
     */
    switch (method) {
      case 'GET': {
        // AWAIT TO RESPONSE
        const response = await axios.get(url, { ...settings })
        const Message = setMessage({ ...message, response })
        // IF REQUEST IS SECURE MODE VALIDATE IF RESPONSE DATA HAVE A VALID ENCYPT DATA
        if (isSecure() && validResponse(response)) {
          response.data = decrypt(response.data.data)
        }
        return { response, Message }
      }
      case 'POST': {
        // AWAIT TO RESPONSE
        const response = await axios.post(url, data, { ...settings })
        const Message = setMessage({ ...message, response })
        // IF REQUEST IS SECURE MODE VALIDATE IF RESPONSE DATA HAVE A VALID ENCYPT DATA
        if (isSecure() && validResponse(response)) {
          response.data = decrypt(response.data.data)
        }
        return { response, Message }
      }
      case 'PUT': {
        // AWAIT TO RESPONSE
        const response = await axios.put(url, data, { ...settings })
        const Message = setMessage({ ...message, response })
        // IF REQUEST IS SECURE MODE VALIDATE IF RESPONSE DATA HAVE A VALID ENCYPT DATA
        if (isSecure() && validResponse(response)) {
          response.data = decrypt(response.data.data)
        }
        return { response, Message }
      }
      case 'DELETE': {
        // AWAIT TO RESPONSE
        const response = await axios.delete(url, data, { ...settings })
        const Message = setMessage({ ...message, response })
        // IF REQUEST IS SECURE MODE VALIDATE IF RESPONSE DATA HAVE A VALID ENCYPT DATA
        if (isSecure() && validResponse(response)) {
          response.data = decrypt(response.data.data)
        }
        return { response, Message }
      }
      default:
        return {}
    }
  } catch (error) {
    let Message = {}
    if (error.response) {
      Message = setMessage({
        ...message,
        response: error.response,
      })
      return { error, Message }
    }
    Message = setMessage({
      response: {
        status: 500,
      },
    })
    return Promise.reject({ error, Message }) // Rejects object prefer new Error
  }
}

export const NewClientHttpRequest = async options => {
  const { urlBase, securityUrl, method, path, withCredentials, data } = options
  if (withCredentials) {
    const authCheck = await axios(securityUrl, {
      method: 'get',
      withCredentials: true,
    })

    const success = await axios(urlBase + path, {
      method,
      data: data || {},
      withCredentials: true,
    })
    return { ...success, sessionData: authCheck }
  }
  // Simple Request with no security
  const success = await axios(urlBase + path, {
    method,
    data: data || {},
    withCredentials: true,
  })
  return success
}

export default null

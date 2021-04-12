import environments from 'src/globalConfig/environments'
import querystring from 'querystring'

export default (path, params, method, urlBase) => {
  const querys = method === 'GET' ? querystring.stringify(params) : ''
  const base =
    urlBase ||
    `${environments.protocol}://${environments.host}:${environments.port}`
  return `${base}${path}?${querys}`
}

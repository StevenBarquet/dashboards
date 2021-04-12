export default {
  protocol: process.env.CLIENT_HTTP_REQUEST_PROTOCOL,
  host: process.env.CLIENT_HTTP_REQUEST_HOST,
  port: process.env.CLIENT_HTTP_REQUEST_PORT,
  algorithm: process.env.ALGORITHM,
  password: process.env.PASSWORD,
  keyLength: process.env.KEY_LENGTH,
}

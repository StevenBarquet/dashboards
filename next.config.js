/* eslint-disable no-param-reassign */
require('dotenv').config()
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const withSass = require('@zeit/next-sass')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/styles/globalVars.less'),
    'utf8'
  )
)

module.exports = withSass(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const otfFonts = /\.(eot|otf|ttf|woff|woff2)$/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]

        config.module.rules.unshift(
          {
            test: otfFonts,
            use: 'file-loader',
          },
          {
            test: antStyles,
            use: 'null-loader',
          }
        )
      }
      config.resolve.modules.push(path.resolve('./'))
      return config
    },
    useFileSystemPublicRoutes: false,
    env: {
      CLIENT_HTTP_REQUEST_PROTOCOL: process.env.CLIENT_HTTP_REQUEST_PROTOCOL,
      CLIENT_HTTP_REQUEST_HOST: process.env.CLIENT_HTTP_REQUEST_HOST,
      CLIENT_HTTP_REQUEST_PORT: process.env.CLIENT_HTTP_REQUEST_PORT,
      ALGORITHM: process.env.ALGORITHM,
      PASSWORD: process.env.PASSWORD,
      KEY_LENGTH: process.env.KEY_LENGTH,
    },
  })
)

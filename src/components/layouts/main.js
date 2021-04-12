/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import FooterMain from 'src/components/layouts/footer'
import ErrorHandler from 'src/components/ErrorHandler'
import Spinner from 'src/components/Spinner'
import { IntlProvider } from 'react-intl'
import Navbar from './Navbar'
import es from '../../globalConfig/translations/es.json'
/**
 * LOCALE DEFAULT MUST BE "EN"
 */
const language = 'es'
const messages = {
  es,
}

const MainLayout = ({ children }) => {
  const state = useSelector(currentState => currentState)
  const { errorHandler } = state

  return (
    <IntlProvider locale="en" messages={messages[language]}>
      <Spinner />
      <div className="layout-iw">
        <Navbar />
        <ErrorHandler className="error-handler" errorHandler={errorHandler} />
        <div className="layout-content">
          <div className="layout-card">{children}</div>
        </div>
        <FooterMain />
      </div>
    </IntlProvider>
  )
}

export default MainLayout

/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app'
import React from 'react'
import withReduxStore from 'src/store/with-redux-store'
import { Provider } from 'react-redux'
import { PageTransition } from 'next-page-transitions'
import MainLayout from 'src/components/layouts/main'
import '../styles/main.less'

class IWApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Provider store={reduxStore}>
        <MainLayout>
          <PageTransition timeout={700} classNames="page-transition">
            <Component {...pageProps} />
          </PageTransition>
          <style jsx global>{`
            .page-transition-enter {
              opacity: 0;
            }
            .page-transition-enter-active {
              opacity: 1;
              transition: opacity 300ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity 300ms;
            }
          `}</style>{' '}
        </MainLayout>
      </Provider>
    )
  }
}

export default withReduxStore(IWApp)

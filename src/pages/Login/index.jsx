import React from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
// Comp
import Login from 'src/components/Login'
// Others
import { logIn } from 'src/actions/login'

const LoginContainer = () => {
  // for make requests
  const dispatchReq = useDispatch()
  const onLogIn = form => dispatchReq(logIn(form))
  return (
    <>
      <Head>
        <script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          async
          defer
        />
      </Head>
      <Login onLogIn={onLogIn} />
    </>
  )
}

export default LoginContainer

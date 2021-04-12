import React from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
// Comp
import RecoverP from 'src/components/RecoverPass'
// Others
import { recoverPass } from 'src/actions/login'

const RecoverPass = () => {
  // for make requests
  const dispatchReq = useDispatch()
  const onRecoverPass = form => dispatchReq(recoverPass(form))
  return (
    <>
      <Head>
        <script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          async
          defer
        />
      </Head>
      <RecoverP onRecoverPass={onRecoverPass} />
    </>
  )
}

export default RecoverPass

import React from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
// Comp
import RecoverM from 'src/components/RecoverMail'
// Others
import { recoverMail } from 'src/actions/login'

const RecoverMail = () => {
  // for make requests
  const dispatchReq = useDispatch()
  const onRecoverMail = form => dispatchReq(recoverMail(form))
  return (
    <>
      <Head>
        <script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          async
          defer
        />
      </Head>
      <RecoverM onRecoverMail={onRecoverMail} />
    </>
  )
}

export default RecoverMail

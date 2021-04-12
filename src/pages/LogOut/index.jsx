import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
// Others
import { logOut } from 'src/actions/login'

const LogOut = () => {
  // for make requests
  const dispatchReq = useDispatch()
  const onLogOut = () => dispatchReq(logOut())
  useEffect(() => {
    onLogOut()
    Router.push('/Login')
  }, [])
  return <h1>Hasta pronto...</h1>
}

export default LogOut

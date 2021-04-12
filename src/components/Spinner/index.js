/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

/**
 *   This component render the spinner if the info that comes from REDUX "isloading" is true.
 *   This component make a wrapped that contains the main Layout in layouts/main
 *   @param {children} component
 *   @returns {ReactComponentElement}
 */

const Spinner = () => {
  const loading = useSelector(state => state.spinner.loading)

  if (loading) {
    return (
      <div className="overlay-spinner">
        <Spin size="large" tip="CARGANDO..." />
      </div>
    )
  }
  return null
}

export default Spinner

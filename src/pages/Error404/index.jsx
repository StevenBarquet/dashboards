import React from 'react'
import parseLabels from 'src/utils/parseLabels'

const Error404 = () => {
  return (
    <>
      <div className="error-404">
        <h2>{parseLabels('error404.title')}</h2>
        <h1>{parseLabels('error404.subTitle')}</h1>
      </div>
    </>
  )
}

export default Error404

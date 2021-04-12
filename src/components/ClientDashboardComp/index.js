/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react'

import GeneralData from './GeneralData'
import NewGraph from './NewGraph'

const ClientDashboardComp = props => {
  const { operationType } = props.dashboard
  const {
    oncreateGenData,
    onUpdateGenData,
    dashboard,
    onGetFilteredUsers,
    onToogleCreate,
  } = props

  const [currentValue, toogleCurrent] = useState(0)

  const next = goBack => {
    if (goBack) {
      toogleCurrent(currentValue - 1)
      onToogleCreate()
    } else {
      toogleCurrent(currentValue + 1)
    }
  }

  return (
    <div className="dashboard-iw-steper">
      <GeneralData
        operationType={operationType}
        onGetFilteredUsers={onGetFilteredUsers}
        oncreateGenData={oncreateGenData}
        onUpdateGenData={onUpdateGenData}
        dashboard={dashboard}
        next={next}
      />
      <NewGraph dashboard={dashboard} next={next} />
    </div>
  )
}

export default ClientDashboardComp

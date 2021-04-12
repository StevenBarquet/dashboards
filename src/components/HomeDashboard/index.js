/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react'
import { Steps } from 'antd'
import parseLabels from 'src/utils/parseLabels'
import GeneralData from './GeneralData'
import Permissions from './Permissions'
import NewGraph from './NewGraph'

const { Step } = Steps

const StepTitles = props => {
  const { title } = props
  return <h2>{parseLabels(title)}</h2>
}

const HomeDashboard = props => {
  const { operationType } = props.dashboard
  const {
    oncreateGenData,
    onUpdateGenData,
    onToogleUpdate,
    onGetOneDashboard,
    onCreateVisualization,
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

  const prev = data => {
    const { id_dashboard } = data
    onGetOneDashboard(id_dashboard)
    onToogleUpdate()
    toogleCurrent(currentValue - 1)
  }

  const steps = [
    {
      title: <StepTitles title="forms.dash.header" />,
      content: (
        <GeneralData
          operationType={operationType}
          onGetFilteredUsers={onGetFilteredUsers}
          oncreateGenData={oncreateGenData}
          onUpdateGenData={onUpdateGenData}
          dashboard={dashboard}
          next={next}
        />
      ),
      key: 1,
    },
    {
      title: <StepTitles title="forms.dash.header.graphs" />,
      content: <NewGraph dashboard={dashboard} next={next} />,
      key: 2,
    },
    {
      title: <StepTitles title="forms.dash.header.persmissions" />,
      content: (
        <Permissions
          operationType={operationType}
          onCreateVisualization={onCreateVisualization}
          dashboard={dashboard}
          prev={prev}
        />
      ),
      key: 3,
    },
  ]

  return (
    <div className="dashboard-iw-steper">
      <Steps type="navigation" current={currentValue}>
        {steps.map(item => (
          <Step key={item.key} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentValue].content}</div>
    </div>
  )
}

export default HomeDashboard

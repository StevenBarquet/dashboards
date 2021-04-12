/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/**
 * Validate a form  with @Joy and wrap the errors to client
 * Sending username & password
 * Get COOKIES FROM AUTH SERVICE
 * POST/GET AUTH SERVICE WITH COOKIES FROM @axios SETTINGS
 *
 */
import React from 'react'
import { Steps } from 'antd'
import parseLabels from 'src/utils/parseLabels'
// Comps
import NewPass from './NewPass'

const { Step } = Steps

const StepTitles = props => {
  const { title } = props
  return <h2>{parseLabels(title)}</h2>
}

const RecoverPass = props => {
  const { onRecoverPass } = props
  function sendPass(form) {
    onRecoverPass(form)
  }

  const steps = [
    {
      title: <StepTitles title="Recover.StepTitle.step2" />,
      content: <NewPass sendPass={sendPass} />,
      key: 1,
    },
  ]

  return (
    <div className="dashboard-iw-steper">
      <Steps type="navigation" current={0}>
        {steps.map(item => (
          <Step key={item.key} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[0].content}</div>
    </div>
  )
}

export default RecoverPass

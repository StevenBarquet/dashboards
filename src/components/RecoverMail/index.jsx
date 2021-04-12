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
import CheckMail from './CheckMail'

const { Step } = Steps

const StepTitles = props => {
  const { title } = props
  return <h2>{parseLabels(title)}</h2>
}

const RecoverMail = props => {
  const { onRecoverMail } = props
  function sendMail(form) {
    onRecoverMail(form)
  }

  const steps = [
    {
      title: <StepTitles title="Recover.StepTitle.step1" />,
      content: <CheckMail sendMail={sendMail} />,
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

export default RecoverMail

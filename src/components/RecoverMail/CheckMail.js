/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/**
 * Validate a form  with @Joy and wrap the errors to client
 * Sending username & password
 * Get COOKIES FROM AUTH SERVICE
 * POST/GET AUTH SERVICE WITH COOKIES FROM @axios SETTINGS
 *
 */
import React, { useReducer, useState } from 'react'
import { Button, Form, Input, Row, Col } from 'antd'
import Recaptcha from 'react-recaptcha'
import { ON_CHANGE, SET_VALIDATE } from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import genericFormReducer from 'src/utils/genericFormReducer'
import { useIntl } from 'react-intl'
import schemaMail from './schemaMail'

const initialState = {
  hasFeedback: false,
  form: {
    email: '',
  },
  validate: {},
}

const CheckMail = props => {
  const { sendMail } = props
  const [state, dispatch] = useReducer(genericFormReducer, initialState)
  const [captcha, setCaptcha] = useState('')
  const { formatMessage } = useIntl()

  const onChangeItemValue = e => {
    const { name, value } = e.target
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  const validateSchema = () => {
    const { error } = schemaMail.validate(state.form, { abortEarly: false })
    if (error) {
      dispatch({ type: SET_VALIDATE, payload: parseJoyErrors(error.details) })
    } else {
      sendMail(state.form)
    }
  }

  function verifyCallback(response) {
    setCaptcha(response)
  }

  function callback() {
    // console.log('Done!!!!')
  }

  return (
    <div className="login">
      <Form colon={isColonFormLabelActive}>
        <Row className="ant-row-center">
          <Col lg={9} md={12} xs={24}>
            <Form.Item
              label={formatMessage({ id: 'login.email' })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.email ? 'error' : 'success'}
              help={state.validate.email && state.validate.email.message}
            >
              <Input
                placeholder={formatMessage({ id: 'login.placeholder.email' })}
                id="email"
                name="email"
                value={state.form.email}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="ant-row-center">
          <Col lg={6} md={12} xs={24}>
            <Recaptcha
              sitekey="6Ldq_qYZAAAAANp5EZSta4c9rzcV4HoHPvy-jXy-"
              render="explicit"
              verifyCallback={verifyCallback}
              onloadCallback={callback}
            />
          </Col>
        </Row>
        <Row className="ant-row-center">
          <Col lg={6} md={12} xs={24}>
            <Form.Item>
              <Button
                disabled={captcha === ''}
                block
                type="primary"
                onClick={() => validateSchema()}
              >
                {formatMessage({ id: 'login.button.send' })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CheckMail

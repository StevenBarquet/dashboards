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
import Recaptcha from 'react-recaptcha'
import { Button, Form, Input, Row, Col } from 'antd'
import Router from 'next/router'
// others
import { useIntl } from 'react-intl'
// form stuff
import { ON_CHANGE, SET_VALIDATE } from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import genericFormReducer from 'src/utils/genericFormReducer'
import schemaLogin from './schema'

const initialState = {
  hasFeedback: false,
  form: {
    email: '',
    password: '',
  },
  validate: {},
}

const Login = props => {
  const { onLogIn } = props
  const [state, dispatch] = useReducer(genericFormReducer, initialState)
  const [captcha, setCaptcha] = useState('')
  const { formatMessage } = useIntl()

  function onChangeItemValue(e) {
    const { name, value } = e.target
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  function verifyCallback(response) {
    setCaptcha(response)
  }

  function callback() {
    // console.log('Done!!!!')
  }

  function validateAndContiniue() {
    const { error } = schemaLogin.validate(state.form, { abortEarly: false })
    if (error) {
      dispatch({ type: SET_VALIDATE, payload: parseJoyErrors(error.details) })
    } else {
      onLogIn({ ...state.form, capcha: captcha }).then(success => {
        if (success) {
          Router.push('/SearchDashboard')
        }
      })
    }
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
          <Col lg={9} md={12} xs={24}>
            <Form.Item
              label={formatMessage({ id: 'login.password' })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.password ? 'error' : 'success'}
              help={state.validate.password && state.validate.password.message}
            >
              <Input.Password
                placeholder={formatMessage({
                  id: 'login.placeholder.password',
                })}
                id="password"
                name="password"
                value={state.form.password}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="ant-row-center">
          <Col lg={9} md={12} xs={24}>
            <Button type="link" onClick={() => Router.push('/RecoverMail')}>
              {formatMessage({ id: 'Recover.linkName' })}
            </Button>
          </Col>
        </Row>
        <Row className="ant-row-center">
          <Col lg={9} md={12} xs={24}>
            <Recaptcha
              sitekey="6Ldq_qYZAAAAANp5EZSta4c9rzcV4HoHPvy-jXy-"
              render="explicit"
              verifyCallback={verifyCallback}
              onloadCallback={callback}
            />
          </Col>
        </Row>
        <Row className="ant-row-center">
          <Col lg={9} md={12} xs={24}>
            <Form.Item>
              <Button
                disabled={captcha === ''}
                block
                type="primary"
                onClick={validateAndContiniue}
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

export default Login

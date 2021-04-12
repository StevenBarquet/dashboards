/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/**
 * Validate a form  with @Joy and wrap the errors to client
 * Sending username & password
 *
 */
import React, { useReducer } from 'react'
import Router from 'next/router'
import { Form, Button, Col, Row, Input, Switch, Divider } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { ON_CHANGEDOS, SET_VALIDATE, RESET_FORM } from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import { useIntl } from 'react-intl'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import genericFormReducer from 'src/utils/genericFormReducer'
// import Router from 'next/router'
import companySchema from './schema'

/**
 *  This component is a simple form that is reused to create and update companies, it listening to the prop "operationComp"
 *  it could be "update" or "create", depending of this, its the view that you can see
 */
const CreateCompany = props => {
  const {
    onClose,
    companyVisible,
    onCreateCompany,
    onGetCompanies,
    operationComp,
    companyData,
    onToogleCreate,
    onUpdateCompany,
  } = props

  const initialState = {
    hasFeedback: false,
    formCompany: {
      name_company: companyData ? companyData.name_company : '',
      description: companyData ? companyData.description : '',
      active: companyData ? companyData.active : false,
    },
    validate: {},
  }
  const [state, dispatch] = useReducer(genericFormReducer, initialState)
  const { formatMessage } = useIntl()

  const onChangeItemValue = e => {
    const { name, value } = e.target
    dispatch({ type: ON_CHANGEDOS, payload: { name, value } })
  }

  const onChangeSelectItem = (value, name) => {
    dispatch({ type: ON_CHANGEDOS, payload: { name, value } })
  }

  const validateSchema = async () => {
    const { error } = companySchema.validate(state.formCompany, {
      abortEarly: false,
    })

    if (error) {
      dispatch({ type: SET_VALIDATE, payload: parseJoyErrors(error.details) })
    } else if (!error && operationComp === 'update') {
      const idUpdated = { id_company: companyData.id_company }
      const updatedCompany = Object.assign(state.formCompany, idUpdated)
      await onUpdateCompany(updatedCompany, onToogleCreate, initialState)
    } else {
      await onCreateCompany(state.formCompany)
      dispatch({
        type: RESET_FORM,
        payload: { formCompany: {}, validate: {}, hasFeedback: false },
      })
      companyVisible && (await onGetCompanies())
      companyVisible && onClose()
      !companyVisible && Router.push('/SearchCompany')
    }
  }

  const onCancel = () => {
    onClose()
    dispatch({
      type: RESET_FORM,
      payload: { formCompany: {}, validate: {}, hasFeedback: false },
    })
  }

  return (
    <>
      {companyVisible ? null : (
        <Divider orientation="left">
          <h1>
            {formatMessage({
              id:
                operationComp === 'update'
                  ? 'forms.createCompany.update'
                  : 'forms.createCompany.title',
            })}
          </h1>
        </Divider>
      )}
      <Form layout="vertical" colon={isColonFormLabelActive} hideRequiredMark>
        <Row gutter={48}>
          <Col xs={22} lg={22} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createCompany.active.label',
              })}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={e => onChangeSelectItem(e, 'active')}
                checked={state.formCompany.active}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={13} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createCompany.label.name_company',
              })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.name_company ? 'error' : 'success'}
              help={
                state.validate.name_company &&
                state.validate.name_company.message
              }
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createCompany.name_company',
                })}
                id="name_company"
                name="name_company"
                value={state.formCompany.name_company}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={13} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createCompany.label.description',
              })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.description ? 'error' : 'success'}
              help={
                state.validate.description && state.validate.description.message
              }
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createCompany.description',
                })}
                id="description"
                name="description"
                value={state.formCompany.description}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={48}>
          {companyVisible ? (
            <Col lg={11} xs={11} offset={1}>
              <Button block onClick={() => onCancel()}>
                {formatMessage({
                  id: 'button.cancel',
                })}
              </Button>
            </Col>
          ) : null}
          <Col lg={11} xs={11} offset={companyVisible ? 0 : 12}>
            <Button block onClick={() => validateSchema()} type="primary">
              {formatMessage({
                id: 'button.send',
              })}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateCompany

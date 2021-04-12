/* eslint-disable camelcase */
import React, { useReducer } from 'react'
import { Divider, Form, Button, Row, Col, Input, Select } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { ON_CHANGE, SET_VALIDATE } from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import parseLabels from 'src/utils/parseLabels'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import genericFormReducer from 'src/utils/genericFormReducer'
import generalData from './generalSchema'

const { TextArea } = Input
const { Option } = Select

/**
 * This component is reused to create and update the dashboards, to create you need to validate the schema "GeneralSchema",
 * this one excludes the array of user permissions of the view because permissions component is used in the update operation
 */
const GeneralData = props => {
  const {
    operationType,
    next,
    oncreateGenData,
    onGetFilteredUsers,
    onUpdateGenData,
    dashboard,
  } = props
  const { data, companies } = dashboard

  const initialState = {
    hasFeedback: false,
    form: {
      name_dashboard: data ? data.name_dashboard : '',
      description: data ? data.description : '',
      id_company: data ? data.id_company : undefined,
      url_dashboard: data ? data.url_dashboard : '',
      user_elastic: data ? data.user_elastic : '',
      password_elastic: data ? data.password_elastic : '',
      confirmPass_dashboard: data ? data.password_elastic : '',
      index: data ? data.index : '',
    },
    validate: {},
  }
  const [state, dispatch] = useReducer(genericFormReducer, initialState)
  // console.log('Props ------->', props)

  const companyOptions = () => {
    return (
      companies &&
      companies.map(item => (
        <Option key={item.id_company} value={item.id_company}>
          {item.name_company}
        </Option>
      ))
    )
  }

  const onChangeItemValue = e => {
    const { name, value } = e.target
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  const onChangeSelectItem = (value, name) => {
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  /**
   * The correctly way to validate the schema is with an if that validares the operationType
   */
  const validateAndContinue = () => {
    const { error } = generalData.validate(state.form, { abortEarly: false })
    const id = { id_company: state.form.id_company }
    if (error) {
      dispatch({
        type: SET_VALIDATE,
        payload: parseJoyErrors(error.details),
      })
    } else if (!error && operationType === 'create') {
      oncreateGenData(state.form).then(res => {
        if (res) {
          onGetFilteredUsers(id)
          next()
        }
      })
    } else if (!error && operationType === 'update') {
      const { id_dashboard } = data
      const updateData = { ...state.form, id_dashboard }
      onUpdateGenData(updateData).then(res => {
        if (res) {
          onGetFilteredUsers(id)
          next()
        }
      })
    }
  }

  return (
    <Form colon={isColonFormLabelActive}>
      <Row gutter={48}>
        <Col md={12} xs={24}>
          <Form.Item
            label={parseLabels('forms.dash.label.name')}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.name_dashboard ? 'error' : 'success'}
            help={
              state.validate.name_dashboard &&
              state.validate.name_dashboard.message
            }
          >
            <Input
              placeholder={parseLabels('forms.dash.name')}
              id="name_dashboard"
              name="name_dashboard"
              value={state.form.name_dashboard}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label={parseLabels('forms.dash.label.company')}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.id_company ? 'error' : 'success'}
            help={
              state.validate.id_company && state.validate.id_company.message
            }
          >
            <Select
              // defaultValue={data && data.id_company}
              placeholder={parseLabels('forms.createUser.id_company')}
              onChange={e => onChangeSelectItem(e, 'id_company')}
              value={state.form.id_company}
            >
              {companyOptions()}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={24}>
          <Form.Item
            label={parseLabels('forms.dash.label.description')}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.description ? 'error' : 'success'}
            help={
              state.validate.description && state.validate.description.message
            }
          >
            <TextArea
              placeholder={parseLabels('forms.dash.description')}
              rows={3}
              id="description"
              name="description"
              value={state.form.description}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Divider orientation="left">
          <h2>{parseLabels('forms.dash.subheader')}</h2>
        </Divider>
      </Row>
      <Row gutter={[48, 0]}>
        <Col xs={24} md={24} lg={16}>
          <Form.Item
            label={parseLabels('forms.dash.label.url')}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.url_dashboard ? 'error' : 'success'}
            help={
              state.validate.url_dashboard &&
              state.validate.url_dashboard.message
            }
          >
            <Input
              placeholder={parseLabels('forms.dash.url')}
              id="url_dashboard"
              name="url_dashboard"
              value={state.form.url_dashboard}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label={parseLabels('forms.dash.graphs.title.index')}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.index ? 'error' : 'success'}
            help={state.validate.index && state.validate.index.message}
          >
            <Input
              placeholder={parseLabels('forms.dash.graphs.placeholder.index')}
              id="index"
              name="index"
              value={state.form.index}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label={parseLabels('forms.user')}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.user_elastic ? 'error' : 'success'}
            help={
              state.validate.user_elastic && state.validate.user_elastic.message
            }
          >
            <Input
              placeholder={parseLabels('forms.placeholder.user')}
              id="user_elastic"
              name="user_elastic"
              value={state.form.user_elastic}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label={parseLabels('login.password')}
            hasFeedback={state.hasFeedback}
            validateStatus={
              state.validate.password_elastic ? 'error' : 'success'
            }
            help={
              state.validate.password_elastic &&
              state.validate.password_elastic.message
            }
          >
            <Input.Password
              placeholder={parseLabels('login.placeholder.password')}
              id="password_elastic"
              name="password_elastic"
              value={state.form.password_elastic}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label={parseLabels('forms.confirmPassword')}
            hasFeedback={state.hasFeedback}
            validateStatus={
              state.validate.confirmPass_dashboard ? 'error' : 'success'
            }
            help={
              state.validate.confirmPass_dashboard &&
              state.validate.confirmPass_dashboard.message
            }
          >
            <Input.Password
              placeholder={parseLabels('forms.createUser.confirmPassword')}
              id="confirmPass_dashboard"
              name="confirmPass_dashboard"
              value={state.form.confirmPass_dashboard}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={7} offset={17}>
          <Button block type="primary" onClick={() => validateAndContinue()}>
            <>
              {parseLabels('button.next')}
              <ArrowRightOutlined />
            </>
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default GeneralData

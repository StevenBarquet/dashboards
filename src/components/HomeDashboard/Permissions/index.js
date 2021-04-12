import React, { useReducer } from 'react'
import { Form, Button, Row, Col, Select, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ON_CHANGE, SET_VALIDATE, RESET_FORM } from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import { useIntl } from 'react-intl'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import genericFormReducer from 'src/utils/genericFormReducer'
import permissionData from '../GeneralData/permissionSchema'

const { Option } = Select
const { confirm } = Modal

const initialState = {
  hasFeedback: false,
  form: {
    id_users: [],
  },
  validate: {},
}

const OperationDashboard = props => {
  const [state, dispatch] = useReducer(genericFormReducer, initialState)
  const { formatMessage } = useIntl()
  const { prev, dashboard, onCreateVisualization } = props
  const { data, users } = dashboard
  console.log('PROPS PERMISSION', props)

  const userOptions = () => {
    return (
      users &&
      users.map(item => (
        <Option key={item.id_user} value={item.id_user}>
          {item.name} {item.surname_paternal}
        </Option>
      ))
    )
  }

  const showConfirm = () => {
    confirm({
      title: 'Confirmación',
      icon: <ExclamationCircleOutlined />,
      content: 'Se creará el dashboard',
      onOk() {
        dispatch({
          type: RESET_FORM,
          payload: initialState,
        })
        const addId = { id_dashboard: data.id_dashboard }
        const createdVisual = Object.assign(state.form, addId)
        onCreateVisualization(createdVisual)
      },
      onCancel() {},
    })
  }

  const onChangeSelectItem = (value, name) => {
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  const validateSchema = async () => {
    const { error } = permissionData.validate(state.form, { abortEarly: false })
    if (error) {
      dispatch({
        type: SET_VALIDATE,
        payload: parseJoyErrors(error.details),
      })
    } else {
      showConfirm()
    }
  }

  return (
    <Form colon={isColonFormLabelActive}>
      <Row gutter={[0, 24]}>
        <Col md={12} xs={24}>
          <h3>
            {formatMessage({
              id: 'forms.dash.permissions.name',
            })}{' '}
            <span>{data && data.name_dashboard}</span>
          </h3>
        </Col>
        <Col md={12} xs={24}>
          <h3>
            {formatMessage({
              id: 'forms.dash.permissions.company',
            })}{' '}
            <span>{data && data.name_company}</span>
          </h3>
        </Col>
      </Row>
      <Row gutter={[0, 28]}>
        <Col lg={24}>
          <h3>
            {formatMessage({
              id: 'forms.dash.permissions.description',
            })}{' '}
            <span>{data && data.description}</span>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col lg={24}>
          <Form.Item
            label={formatMessage({ id: 'forms.dash.label.permissions' })}
            hasFeedback={state.hasFeedback}
            validateStatus={state.validate.id_users ? 'error' : 'success'}
            help={state.validate.id_users && state.validate.id_users.message}
          >
            <Select
              placeholder={formatMessage({
                id: 'forms.dash.permissions',
              })}
              mode="multiple"
              id="id_users"
              value={state.form.id_users}
              name="id_users"
              onChange={e => onChangeSelectItem(e, 'id_users')}
            >
              {userOptions()}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={7} offset={10}>
          <Button block onClick={() => prev(data)}>
            {formatMessage({
              id: 'button.prev',
            })}
          </Button>
        </Col>
        <Col span={7}>
          <Button block type="primary" onClick={() => validateSchema()}>
            {formatMessage({
              id: 'button.save',
            })}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default OperationDashboard

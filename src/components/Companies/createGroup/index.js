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
import groupSchema from './schema'

/**
 *  This component is a simple form that is reused to create and update groups, it listening to the prop "operationComp"
 *  it could be "update" or "create", depending of this, its the view that you can see
 */
const CreateGroup = props => {
  const {
    onClose,
    groupVisible,
    onCreateGroup,
    onGetGroups,
    groupData,
    operationComp,
    onToogleCreate,
    onUpdateGroup,
  } = props
  const initialState = {
    hasFeedback: false,
    formGroup: {
      name_group: groupData ? groupData.type_group : '',
      description: groupData ? groupData.description : '',
      active: groupData ? groupData.active : false,
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
    const { error } = groupSchema.validate(state.formGroup, {
      abortEarly: false,
    })

    if (error) {
      dispatch({ type: SET_VALIDATE, payload: parseJoyErrors(error.details) })
    } else if (!error && operationComp === 'update') {
      const idUpdated = { id_group: groupData.id_group }
      const updatedGroup = Object.assign(state.formGroup, idUpdated)
      onUpdateGroup(updatedGroup, onToogleCreate, initialState)
    } else {
      await onCreateGroup(state.formGroup)
      groupVisible && (await onGetGroups())
      groupVisible && onClose()
      !groupVisible && Router.push('/SearchGroup')
      dispatch({ type: RESET_FORM, payload: initialState })
    }
  }

  const onCancel = () => {
    onClose()
    dispatch({ type: RESET_FORM, payload: initialState })
  }

  return (
    <>
      {groupVisible ? null : (
        <Divider orientation="left">
          <h1>
            {formatMessage({
              id:
                operationComp === 'update'
                  ? 'forms.createGroup.update'
                  : 'forms.createGroup.title',
            })}
          </h1>
        </Divider>
      )}
      <Form layout="vertical" colon={isColonFormLabelActive} hideRequiredMark>
        <Row gutter={48}>
          <Col xs={22} lg={22} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createGroup.active.label',
              })}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={e => onChangeSelectItem(e, 'active')}
                checked={state.formGroup.active}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={13} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createGroup.label.name_group',
              })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.name_group ? 'error' : 'success'}
              help={
                state.validate.name_group && state.validate.name_group.message
              }
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createGroup.name_group',
                })}
                id="name_group"
                name="name_group"
                value={state.formGroup.name_group}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={13} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createGroup.label.description',
              })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.description ? 'error' : 'success'}
              help={
                state.validate.description && state.validate.description.message
              }
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createGroup.description',
                })}
                id="description"
                name="description"
                value={state.formGroup.description}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={48}>
          {groupVisible ? (
            <Col lg={11} xs={11} offset={1}>
              <Button block onClick={() => onCancel()}>
                {formatMessage({
                  id: 'button.cancel',
                })}
              </Button>
            </Col>
          ) : null}
          <Col lg={11} xs={11} offset={groupVisible ? 0 : 12}>
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

export default CreateGroup

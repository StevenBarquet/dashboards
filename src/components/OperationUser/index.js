/* eslint-disable react/prop-types */
/**
 * Validate a form  with @Joy and wrap the errors to client
 * Sending username & password
 *
 */
import React, { useReducer, useState } from 'react'
import {
  Button,
  Select,
  Form,
  Switch,
  Input,
  Divider,
  Row,
  Col,
  Upload,
  Drawer,
  message,
} from 'antd'
import {
  CloseOutlined,
  CheckOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { ON_CHANGE, SET_VALIDATE, RESET_FORM } from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import { useIntl } from 'react-intl'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import genericFormReducer from 'src/utils/genericFormReducer'
import CreateCompany from 'src/components/Companies/CreateCompany'
import CreateGroup from 'src/components/Companies/createGroup'
import userSchema from './schema'
import updateSchema from './updateSchema'

const { Option } = Select

const CreateUser = props => {
  const {
    operation,
    user,
    onCreateUser,
    dashboard,
    onUpdateUser,
    onCreateCompany,
    onGetCompanies,
    onGetGroups,
    onToogleCreate,
    onCreateGroup,
  } = props
  const { companies, groups } = dashboard

  const initialState = {
    hasFeedback: false,
    form: {
      photo_base64: undefined,
      name: user ? user.name : '',
      surname_paternal: user ? user.surname_paternal : '',
      surname_maternal: user ? user.surname_maternal : '',
      email: user ? user.email : '',
      active: user ? user.active : false,
      password: user ? user.password : '',
      confirmPassword: user ? user.password : '',
      id_company: user ? user.id_company : undefined,
      id_group: user ? user.id_group : undefined,
    },
    validate: {},
  }

  const [state, dispatch] = useReducer(genericFormReducer, initialState)
  const [companyVisible, toogleCompany] = useState(false)
  const [groupVisible, toogleGroup] = useState(false)
  const [loading, loaded] = useState(false)
  const [imageUrl, imageLoaded] = useState(undefined)
  const { formatMessage } = useIntl()

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 640 / 480 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const showCompany = () => {
    toogleCompany(true)
  }

  const showGroup = () => {
    toogleGroup(true)
  }

  const onCloseCompany = () => {
    toogleCompany(false)
    dispatch({ type: RESET_FORM, payload: initialState })
  }

  const onCloseGroup = () => {
    toogleGroup(false)
    dispatch({ type: RESET_FORM, payload: initialState })
  }

  const handleImage = info => {
    if (info.file.status === 'uploading') {
      loaded(!loading)
    }
    if (info.file.status === 'done') {
      const getBase64 = (img, call) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => call(reader.result))
        reader.readAsDataURL(img)
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, image => imageLoaded(image))
      loaded(!loading)
    }
  }

  const onChangeItemValue = e => {
    const { name, value } = e.target
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  const onChangeSelectItem = (value, name) => {
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }

  const validateSchema = () => {
    if (operation === 'create') {
      const { error } = userSchema.validate(state.form, { abortEarly: false })
      if (error) {
        dispatch({
          type: SET_VALIDATE,
          payload: parseJoyErrors(error.details),
        })
      } else {
        const image = { photo_base64: user ? user.photo_base64 : imageUrl }
        const form = Object.assign(state.form, image)
        imageLoaded(undefined)
        loaded(false)
        onCreateUser(form, initialState)
      }
    }
    if (operation === 'update') {
      const formUpdated = {
        name: state.form.name,
        surname_paternal: state.form.surname_paternal,
        surname_maternal: state.form.surname_maternal,
        email: state.form.email,
        active: state.form.active,
        id_company: state.form.id_company,
        id_group: state.form.id_group,
      }
      const { error } = updateSchema.validate(formUpdated, {
        abortEarly: false,
      })
      if (error) {
        dispatch({
          type: SET_VALIDATE,
          payload: parseJoyErrors(error.details),
        })
      } else {
        formUpdated.id_user = user.id_user
        const dataFake = { photo_base64: user.photo_base64 }
        const form = Object.assign(formUpdated, dataFake)
        onUpdateUser(form)
        onToogleCreate()
      }
    }
  }

  const uploadButton = () => (
    <div>
      {loading === true ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  const optionsCompany = () => {
    return (
      companies &&
      companies.map(item => (
        <Option key={item.id_company} value={item.id_company}>
          {item.name_company}
        </Option>
      ))
    )
  }

  const optionsGroup = () => {
    return (
      groups &&
      groups.map(item => (
        <Option key={item.id_group} value={item.id_group}>
          {item.type_group}
        </Option>
      ))
    )
  }

  return (
    <>
      <Divider orientation="left">
        <h1>
          {operation === 'update'
            ? 'MODIFICACIÓN DE USUARIOS'
            : 'CREACIÓN DE USUARIOS'}
        </h1>
      </Divider>
      <Form colon={isColonFormLabelActive}>
        <Row>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({ id: 'forms.createUser.label.photo' })}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleImage}
              >
                {user || imageUrl ? (
                  <img
                    src={user ? `${user.photo_base64}` : imageUrl}
                    alt="avatar"
                    style={{ width: '100%' }}
                  />
                ) : (
                  uploadButton()
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({ id: 'forms.createUser.active.label' })}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={e => onChangeSelectItem(e, 'active')}
                checked={state.form.active}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({ id: 'forms.createUser.label.name' })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.name ? 'error' : 'success'}
              help={state.validate.name && state.validate.name.message}
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createUser.name',
                })}
                id="name"
                name="name"
                value={state.form.name}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createUser.label.surname_paternal',
              })}
              hasFeedback={state.hasFeedback}
              validateStatus={
                state.validate.surname_paternal ? 'error' : 'success'
              }
              help={
                state.validate.surname_paternal &&
                state.validate.surname_paternal.message
              }
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createUser.surname_paternal',
                })}
                id="surname_paternal"
                name="surname_paternal"
                value={state.form.surname_paternal}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({
                id: 'forms.createUser.label.surname_maternal',
              })}
              hasFeedback={state.hasFeedback}
              validateStatus={
                state.validate.surname_maternal ? 'error' : 'success'
              }
              help={
                state.validate.surname_maternal &&
                state.validate.surname_maternal.message
              }
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createUser.surname_maternal',
                })}
                id="surname_maternal"
                name="surname_maternal"
                value={state.form.surname_maternal}
                onChange={onChangeItemValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {operation === 'create' ? (
            <>
              <Col lg={7} offset={1}>
                <Form.Item
                  label={formatMessage({
                    id: 'forms.createUser.label.password',
                  })}
                  hasFeedback={state.hasFeedback}
                  validateStatus={state.validate.password ? 'error' : 'success'}
                  help={
                    state.validate.password && state.validate.password.message
                  }
                >
                  <Input.Password
                    placeholder={formatMessage({
                      id: 'forms.createUser.password',
                    })}
                    id="password"
                    name="password"
                    value={state.form.password}
                    onChange={onChangeItemValue}
                  />
                </Form.Item>
              </Col>
              <Col lg={7} offset={1}>
                <Form.Item
                  label={formatMessage({
                    id: 'forms.createUser.label.confirmPassword',
                  })}
                  hasFeedback={state.hasFeedback}
                  validateStatus={
                    state.validate.confirmPassword ? 'error' : 'success'
                  }
                  help={
                    state.validate.confirmPassword &&
                    state.validate.confirmPassword.message
                  }
                >
                  <Input.Password
                    placeholder={formatMessage({
                      id: 'forms.createUser.confirmPassword',
                    })}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={state.form.confirmPassword}
                    onChange={onChangeItemValue}
                  />
                </Form.Item>
              </Col>
            </>
          ) : null}
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({ id: 'forms.createUser.label.email' })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.email ? 'error' : 'success'}
              help={state.validate.email && state.validate.email.message}
            >
              <Input
                placeholder={formatMessage({
                  id: 'forms.createUser.email',
                })}
                id="email"
                name="email"
                value={state.form.email}
                onChange={onChangeItemValue}
                disabled={operation === 'update'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">
          <h2>Selecciona el grupo y la compañía</h2>
        </Divider>
        <Row>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({ id: 'forms.createUser.id_company.label' })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.id_company ? 'error' : 'success'}
              help={
                state.validate.id_company && state.validate.id_company.message
              }
            >
              <Select
                defaultValue={user && user.id_company}
                placeholder={formatMessage({
                  id: 'forms.createUser.id_company',
                })}
                onChange={e => onChangeSelectItem(e, 'id_company')}
                value={state.form.id_company}
              >
                {optionsCompany()}
              </Select>
            </Form.Item>
          </Col>
          <Col className="button-45" xs={21} lg={5} offset={2}>
            <Button block type="primary" onClick={() => showCompany()}>
              <PlusOutlined />
              {formatMessage({
                id: 'button.create.company',
              })}
            </Button>
            <Drawer
              title={formatMessage({
                id: 'button.create.company',
              })}
              width={720}
              onClose={() => onCloseCompany()}
              visible={companyVisible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <CreateCompany
                companyVisible={companyVisible}
                onClose={onCloseCompany}
                onCreateCompany={onCreateCompany}
                onGetCompanies={onGetCompanies}
              />
            </Drawer>
          </Col>
        </Row>
        <Row>
          <Col lg={7} offset={1}>
            <Form.Item
              label={formatMessage({ id: 'forms.createUser.id_group.label' })}
              hasFeedback={state.hasFeedback}
              validateStatus={state.validate.id_group ? 'error' : 'success'}
              help={state.validate.id_group && state.validate.id_group.message}
            >
              <Select
                defaultValue={user && user.id_group}
                placeholder={formatMessage({
                  id: 'forms.createUser.id_group',
                })}
                onChange={e => onChangeSelectItem(e, 'id_group')}
                value={state.form.id_group}
              >
                {optionsGroup()}
              </Select>
            </Form.Item>
          </Col>
          <Col className="button-45" xs={21} lg={5} offset={2}>
            <Button block type="primary" onClick={() => showGroup()}>
              <PlusOutlined />
              {formatMessage({
                id: 'button.create.group',
              })}
            </Button>
            <Drawer
              title={formatMessage({
                id: 'button.create.group',
              })}
              width={720}
              onClose={() => onCloseGroup()}
              visible={groupVisible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <CreateGroup
                groupVisible={groupVisible}
                onClose={onCloseGroup}
                onCreateGroup={onCreateGroup}
                onGetGroups={onGetGroups}
              />
            </Drawer>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col lg={11} offset={7}>
            <Form.Item>
              <Button block type="primary" onClick={validateSchema}>
                {formatMessage({
                  id:
                    operation === 'update'
                      ? 'forms.updateUser.button'
                      : 'forms.createUser.button',
                })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateUser

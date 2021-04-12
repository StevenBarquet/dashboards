/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import React from 'react'
import Router from 'next/router'
import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useIntl } from 'react-intl'
import { Table, Tag, Divider, Row, Col, Button, Input, Modal } from 'antd'

const { confirm } = Modal
const { Search } = Input

/**
 *
 */
const SearchUser = props => {
  const {
    onFilterUser,
    onGetOneUser,
    userData,
    onToogleCreate,
    onRemoveUser,
    onGetUsers,
  } = props
  const { formatMessage } = useIntl()

  /**
   *
   * @param row ---> Contain the info of the row clicked
   */
  const onShowModal = async row => {
    const { name, surname_paternal, surname_maternal, id_user } = row
    confirm({
      title: 'Eliminar usuario',
      icon: <ExclamationCircleOutlined />,
      content: `${formatMessage({
        id: 'forms.searchUser.titleModal.search',
      })} ${name} ${surname_paternal} ${surname_maternal} ?`,
      async onOk() {
        const form = { id_user }
        await onRemoveUser(form)
        await onGetUsers()
      },
      onCancel() {},
    })
  }

  /**
   *
   * @param row
   * @return @NewReactPage ---> Redirect to "OperationUser" page with your query
   *         @Action --> Make the change to the type of the "operationType" to "update" and get the user to be updated
   */
  const updateUser = row => {
    const { id_user } = row
    Router.push({ pathname: '/OperationUser', query: { id_user } })
    onGetOneUser(id_user)
  }

  /**
   * @return @NewReactPage ---> Redirect to "OperationUser" page with your query
   *         @Action --> Make the change to the type of the "operationType" to "create"
   */
  const CreateUser = () => {
    Router.push('/OperationUser')
    onToogleCreate()
  }

  /**
   *
   * @param value ---> Contain the word typed
   * @returns @Action ---> Find the user and show him in the table.
   */
  const onFilter = value => {
    onFilterUser({ search: value })
  }

  const columns = [
    {
      title: `${formatMessage({ id: 'forms.searchUser.titleTable.name' })}`,
      key: 'name',
      dataIndex: 'name',
      render: (text, record) =>
        `${record.name} ${record.surname_paternal} ${record.surname_maternal}`,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({ id: 'forms.searchUser.titleTable.correo' })}`,
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: `${formatMessage({ id: 'forms.searchUser.titleTable.empresa' })}`,
      key: 'company',
      dataIndex: 'name_company',
      sorter: (a, b) => a.name_company.length - b.name_company.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({ id: 'forms.searchUser.titleTable.active' })}`,
      key: 'id_user',
      dataIndex: 'active',
      render: text => (
        <Tag color={text === true ? 'green' : 'volcano'}>
          {text === true ? 'ACTIVO' : 'INACTIVO'}
        </Tag>
      ),
      sorter: (a, b) => a.active.length - b.active.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Acciones',
      render: row => (
        <span>
          <DeleteTwoTone
            className="table-action"
            twoToneColor="red"
            onClick={() => onShowModal(row)}
          />
          <EditTwoTone twoToneColor="green" onClick={() => updateUser(row)} />
        </span>
      ),
    },
  ]

  return (
    <>
      <Divider orientation="left">
        <h1>{formatMessage({ id: 'forms.searchUser.title.search' })}</h1>
      </Divider>
      <Row>
        <Col lg={4} md={2} xs={24} offset={1}>
          <Button block onClick={() => CreateUser()} type="primary">
            <PlusOutlined />{' '}
            {formatMessage({ id: 'forms.searchUser.buttonCreate.search' })}
          </Button>
        </Col>
        <Col lg={6} md={5} xs={24} offset={12}>
          <Search
            placeholder={formatMessage({
              id: 'forms.searchUser.input.search',
            })}
            onSearch={value => onFilter(value)}
            enterButton
          />
        </Col>
      </Row>
      <Table
        className="table-iw"
        key="users"
        columns={columns}
        dataSource={userData.users}
      />
    </>
  )
}

export default SearchUser

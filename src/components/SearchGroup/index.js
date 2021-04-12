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
const SearchGruop = props => {
  const {
    onFilterGroup,
    onGetOneGroup,
    groupData,
    onToogleCreate,
    onToogleUpdate,
    onRemoveGroup,
    onGetGroups,
  } = props

  const { formatMessage } = useIntl()

  /**
   *
   * @param row ---> Contain the info of the row clicked
   */
  const onShowModal = row => {
    const { type_group, id_group } = row
    const idRemoved = { id_group }
    confirm({
      title: 'Eliminar Grupo',
      icon: <ExclamationCircleOutlined />,
      content: `${formatMessage({
        id: 'forms.searchGroup.titleModal.search',
      })} "${type_group}" ?`,
      async onOk() {
        await onRemoveGroup(idRemoved)
        await onGetGroups()
      },
      onCancel() {},
    })
  }

  /**
   *
   * @param row
   * @return @NewReactPage ---> Redirect to "OperationGroup" page with your query
   *         @Action --> Make the change to the type of the "operationType" to "update" and get the user to be updated
   */
  const updateGroup = row => {
    const { id_group } = row
    onToogleUpdate()
    onGetOneGroup(id_group)
    Router.push({ pathname: '/CreateGroup', query: { id_group } })
  }

  /**
   * @return @NewReactPage ---> Redirect to "OperationGroup" page with your query
   *         @Action --> Make the change to the type of the "operationType" to "create"
   */
  const CreateGroup = () => {
    Router.push('/CreateGroup')
    onToogleCreate()
  }

  /**
   *
   * @param value ---> Contain the word typed
   * @returns @Action ---> Find the gropu and show him in the table.
   */
  const onFilter = value => {
    onFilterGroup({ search: value })
  }

  const columns = [
    {
      title: `${formatMessage({ id: 'forms.searchGroup.titleTable.type' })}`,
      key: 'tipe',
      dataIndex: 'type_group',
      sorter: (a, b) => a.type_group.length - b.type_group.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({
        id: 'forms.searchGroup.titleTable.description',
      })}`,
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: `${formatMessage({ id: 'forms.searchGroup.titleTable.active' })}`,
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
          <EditTwoTone twoToneColor="green" onClick={() => updateGroup(row)} />
        </span>
      ),
    },
  ]

  return (
    <>
      <Divider orientation="left">
        <h1>{formatMessage({ id: 'forms.searchGroup.title.search' })}</h1>
      </Divider>
      <Row>
        <Col lg={4} md={2} xs={24} offset={1}>
          <Button block onClick={() => CreateGroup()} type="primary">
            <PlusOutlined />{' '}
            {formatMessage({ id: 'forms.searchGroup.buttonCreate.search' })}
          </Button>
        </Col>
        <Col lg={6} md={5} xs={24} offset={12}>
          <Search
            placeholder={formatMessage({
              id: 'forms.searchGroup.input.search',
            })}
            onSearch={value => onFilter(value)}
            enterButton
          />
        </Col>
      </Row>
      <Table
        className="table-iw"
        key="group"
        columns={columns}
        dataSource={groupData.groups}
      />
    </>
  )
}

export default SearchGruop

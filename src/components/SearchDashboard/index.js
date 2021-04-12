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
  EyeTwoTone,
} from '@ant-design/icons'
import { useIntl } from 'react-intl'
import { Table, Tag, Divider, Row, Col, Button, Input, Modal } from 'antd'

const { confirm } = Modal
const { Search } = Input

/**
 *
 */
const SearchDashboard = props => {
  const {
    onFilterDashboard,
    dashboardsData,
    onGetOneDashboard,
    onToogleCreate,
    onRemoveDashboard,
    onGetDashboard,
    onGetOneDashboardRead,
  } = props
  const { formatMessage } = useIntl()

  /**
   *
   * @param row ---> Contain the info of the row clicked
   */
  const onShowModal = row => {
    const { name_dashboard, id_dashboard } = row
    const idRemoved = { id_dashboard }

    confirm({
      title: 'Eliminar usuario',
      icon: <ExclamationCircleOutlined />,
      content: `${formatMessage({
        id: 'forms.searchDashboard.titleModal.search',
      })} ${name_dashboard} ?`,
      async onOk() {
        await onRemoveDashboard(idRemoved)
        await onGetDashboard()
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
  const updateDashboard = row => {
    const { id_dashboard } = row
    // Router.push('/home-dashboard')
    onGetOneDashboard(id_dashboard)
  }

  const readDashboard = row => {
    const { id_dashboard } = row
    // Router.push('/home-dashboard')
    onGetOneDashboardRead(id_dashboard)
  }

  /**
   * @return @NewReactPage ---> Redirect to "OperationDashboard" page with your query
   *         @Action --> Make the change to the type of the "operationType" to "create"
   */
  const CreateDashboard = () => {
    Router.push('/home-dashboard')
    onToogleCreate()
  }

  /**
   *
   * @param value ---> Contain the word typed
   * @returns @Action ---> Find the gropu and show him in the table.
   */
  const onFilter = value => {
    onFilterDashboard({ search: value })
  }

  const columns = [
    {
      title: `${formatMessage({
        id: 'forms.searchDashboard.titleTable.name',
      })}`,
      key: 'name',
      dataIndex: 'name_dashboard',
      sorter: (a, b) => a.name_dashboard.length - b.name_dashboard.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({
        id: 'forms.searchDashboard.titleTable.index',
      })}`,
      key: 'index',
      dataIndex: 'index',
      sorter: (a, b) => a.index.length - b.index.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({
        id: 'forms.searchDashboard.titleTable.server',
      })}`,
      key: 'url',
      dataIndex: 'url_dashboard',
    },
    {
      title: `${formatMessage({
        id: 'forms.searchDashboard.titleTable.company',
      })}`,
      key: 'company',
      dataIndex: 'name_company',
      sorter: (a, b) => a.name_company.length - b.name_company.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({
        id: 'forms.searchDashboard.titleTable.active',
      })}`,
      key: 'id_dashboard',
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
          <EyeTwoTone
            className="table-action"
            twoToneColor="blue"
            onClick={() => readDashboard(row)}
          />
          <EditTwoTone
            className="table-action"
            twoToneColor="green"
            onClick={() => updateDashboard(row)}
          />
          <DeleteTwoTone twoToneColor="red" onClick={() => onShowModal(row)} />
        </span>
      ),
    },
  ]

  return (
    <>
      <Divider orientation="left">
        <h1>{formatMessage({ id: 'forms.searchDashboard.title.search' })}</h1>
      </Divider>
      <Row>
        <Col lg={6} md={2} xs={24} offset={1}>
          <Button block onClick={() => CreateDashboard()} type="primary">
            <PlusOutlined />{' '}
            {formatMessage({ id: 'forms.searchDashboard.buttonCreate.search' })}
          </Button>
        </Col>
        <Col lg={7} md={5} xs={24} offset={9}>
          <Search
            placeholder={formatMessage({
              id: 'forms.searchDashboard.input.search',
            })}
            onSearch={value => onFilter(value)}
            enterButton
          />
        </Col>
      </Row>
      <Table
        className="table-iw"
        key="dashboard"
        columns={columns}
        dataSource={dashboardsData.dashboardsData}
      />
    </>
  )
}

export default SearchDashboard

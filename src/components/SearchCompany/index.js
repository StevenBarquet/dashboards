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
const SearchCompany = props => {
  const {
    onFilterCompany,
    onGetOneCompany,
    onRemoveCompany,
    onToogleUpdate,
    companyData,
    onGetCompanies,
    onToogleCreate,
  } = props
  const { formatMessage } = useIntl()

  /**
   *
   * @param row ---> Contain the info of the row clicked
   */

  const onShowModal = row => {
    const { name_company, id_company } = row
    const idRemoved = { id_company }
    confirm({
      title: 'Eliminar empresa',
      icon: <ExclamationCircleOutlined />,
      content: `${formatMessage({
        id: 'forms.searchCompany.titleModal.search',
      })} "${name_company}" ?`,
      async onOk() {
        await onRemoveCompany(idRemoved)
        await onGetCompanies()
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
  const updateCompany = async row => {
    const { id_company } = row
    onToogleUpdate()
    await onGetOneCompany(id_company)
    Router.push({ pathname: '/CreateCompany', query: { id_company } })
  }

  /**
   * @return @NewReactPage ---> Redirect to "OperationCompany" page with your query
   *         @Action --> Make the change to the type of the "operationType" to "create"
   */
  const CreateCompany = () => {
    Router.push('/CreateCompany')
    onToogleCreate()
  }

  /**
   *
   * @param value ---> Contain the word typed
   * @returns @Action ---> Find the gropu and show him in the table.
   */
  const onFilter = value => {
    onFilterCompany({ search: value })
  }

  const columns = [
    {
      title: `${formatMessage({
        id: 'forms.searchCompany.titleTable.company',
      })}`,
      key: 'company',
      dataIndex: 'name_company',
      sorter: (a, b) => a.name_company.length - b.name_company.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: `${formatMessage({
        id: 'forms.searchCompany.titleTable.description',
      })}`,
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: `${formatMessage({
        id: 'forms.searchCompany.titleTable.active',
      })}`,
      key: 'id_company',
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
          <EditTwoTone
            twoToneColor="green"
            onClick={() => updateCompany(row)}
          />
        </span>
      ),
    },
  ]

  return (
    <>
      <Divider orientation="left">
        <h1>{formatMessage({ id: 'forms.searchCompany.title.search' })}</h1>
      </Divider>
      <Row>
        <Col lg={4} md={2} xs={24} offset={1}>
          <Button block onClick={() => CreateCompany()} type="primary">
            <PlusOutlined />
            {formatMessage({ id: 'forms.searchCompany.buttonCreate.search' })}
          </Button>
        </Col>
        <Col lg={6} md={5} xs={24} offset={12}>
          <Search
            placeholder={formatMessage({
              id: 'forms.searchCompany.input.search',
            })}
            onSearch={value => onFilter(value)}
            enterButton
          />
        </Col>
      </Row>
      <Table
        className="table-iw"
        key="company"
        columns={columns}
        dataSource={companyData.companies}
      />
    </>
  )
}

export default SearchCompany

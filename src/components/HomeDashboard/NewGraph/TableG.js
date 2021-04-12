import React from 'react'
import { Table } from 'antd'

const TableG = props => {
  const { graphData } = props
  const { aggregations, nameX, nameY } = graphData

  function validateAxisTitle(str) {
    if (str && str.length > 0 && str.length < 35) {
      return str
    }
    return null
  }

  const titleX = validateAxisTitle(nameX) || 'Nombre'
  const titleY = validateAxisTitle(nameY) || 'Valor'
  const dataSource = aggregations

  const columns = [
    {
      title: titleX,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: titleY,
      dataIndex: 'count',
      key: 'count',
    },
  ]

  // ---------------------------------------------- RENDER -----------------------------------------------
  return (
    <div className="other-graphs-container">
      <div className="scroll-cont">
        <Table
          pagination={{
            current: 1,
            pageSize: 100,
          }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default TableG

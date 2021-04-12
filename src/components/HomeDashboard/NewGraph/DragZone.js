/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react'
import parseLabels from 'src/utils/parseLabels'
import { Button, Row, Col } from 'antd'
// Comps
import Graph from './Graph'

const DragZone = props => {
  const { graphData, id, handleEditGraph, editIndex } = props

  const DragIcon = () => {
    const url =
      'https://icons-for-free.com/iconfiles/png/512/cursor+drag+move+icon-1320196809400737317.png'
    return <img src={url} alt="Drag zone" width="100%" />
  }
  return (
    <Row gutter={[5, 10]}>
      <Col span={24}>
        <h2 className="title-container">{graphData.title}</h2>
      </Col>
      <Col span={24}>
        <Graph id={id} graphData={graphData} />
        {/* <MockGraph /> */}
      </Col>
      <Col span={24}>
        <p className="description-container">
          <span>{parseLabels('forms.createCompany.label.description')}: </span>
          {graphData.description}
        </p>
      </Col>

      <Col xs={24} sm={24} xl={{ span: 8, offset: 16 }}>
        <Button
          disabled={editIndex !== -1}
          block
          type="primary"
          onClick={() => handleEditGraph(id)}
        >
          {parseLabels('button.edit')}
        </Button>
      </Col>
    </Row>
  )
}

export default DragZone

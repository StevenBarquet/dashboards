/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react'
import parseLabels from 'src/utils/parseLabels'
import { Row, Col } from 'antd'
// Comps
import Graph from './Graph'

const GraphContent = props => {
  const { graphData, id } = props
  return (
    <Row gutter={[5, 10]}>
      <Col className="title-container" span={24}>
        <div className="title-container">
          <h2>{graphData.title}</h2>
        </div>
      </Col>
      <Col span={24}>
        <Graph id={id} graphData={graphData} />
      </Col>
      <Col span={24}>
        <div className="description-container">{graphData.description}</div>
      </Col>
    </Row>
  )
}

export default GraphContent

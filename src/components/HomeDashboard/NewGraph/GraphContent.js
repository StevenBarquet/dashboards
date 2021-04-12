/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react'
import parseLabels from 'src/utils/parseLabels'
import { Button, Row, Col } from 'antd'
import { EditOutlined } from '@ant-design/icons'
// Comps
import Graph from './Graph'

const GraphContent = props => {
  const { graphData, id, handleEditGraph, editIndex } = props

  const MockGraph = () => {
    const url =
      'https://www.researchgate.net/profile/Stephen_Bortone/publication/288971859/figure/fig4/AS:708467018964996@1545923108546/Bar-graph-of-marginal-increment-by-month-of-all-fish-examined-Numbers-above-bars.png'
    return <img src={url} alt="No url :C" width="100%" />
  }
  return (
    <Row gutter={[5, 10]}>
      <Col span={20}>
        <div className="title-container">
          <h2>{graphData.title}</h2>
        </div>
      </Col>
      <Col span={4}>
        <Button
          disabled={editIndex !== -1}
          block
          type="primary"
          onClick={() => handleEditGraph(id)}
        >
          <EditOutlined />
        </Button>
      </Col>
      <Col span={24}>
        <Graph id={id} graphData={graphData} />
        {/* <MockGraph /> */}
      </Col>
      <Col span={24}>
        <div className="description-container">{graphData.description}</div>
      </Col>
    </Row>
  )
}

export default GraphContent

/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React from 'react'
import { Row, Col } from 'antd'
// Comps
import GraphContent from './GraphContent'

const GraphsContainer = props => {
  const { graphsData } = props

  if (graphsData && graphsData.length > 0) {
    return (
      <div className="dashboard-graphs-container">
        <Row gutter={[5, 20]}>
          {graphsData.map((graphData, index) => {
            const { cols, id_graph } = graphData
            return (
              <Col key={id_graph} xs={24} sm={24} xl={cols}>
                <div id={index} className="graph-container">
                  <GraphContent id={index} graphData={graphData} />
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  return null
}

export default GraphsContainer

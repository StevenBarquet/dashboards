import React from 'react'
import { Row } from 'antd'

const Indicator = props => {
  const { name, count } = props
  return (
    <td>
      <h2>{count.toFixed(2)}</h2>
      <p>{name}</p>
    </td>
  )
}

const IndicatorsG = props => {
  const { graphData } = props
  const { aggregations } = graphData
  // const colWidth = graphData.cols === 24 ? 12 : 24
  // ---------------------------------------------- RENDER -----------------------------------------------
  if (aggregations && aggregations.length > 0) {
    return (
      <div className="other-graphs-container">
        <div className="scroll-cont">
          <Row grutter={[10, 10]}>
            <table
              className={
                aggregations.length === 1 ? 'indicador' : 'indicadores'
              }
            >
              <tr>
                {aggregations.map(graph => {
                  const { name, count } = graph
                  return <Indicator key={count} name={name} count={count} />
                })}
              </tr>
            </table>
          </Row>
        </div>
      </div>
    )
  }
  return <h2>No data</h2>
}

export default IndicatorsG

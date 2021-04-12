/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React from 'react'
import { Row, Col } from 'antd'
// Comps
import DragManagment from './DragManagment'

const GraphsContainer = props => {
  const {
    graphsData,
    // for child components only
    setInitialGraphs,
    reOrderGraph,
    formData,
    dragMode,
    editIndex,
    handleEditGraph,
    dragReMap,
    simpleReMap,
    reRender,
    onChangeItemValue,
    onChangeSelectItem,
    changeDragMode,
    isNewGraph,
    saveGraph,
    cancelGraph,
    deleteGraph,
  } = props

  if (graphsData && graphsData.length > 0) {
    return (
      <div className="dashboard-graphs-container">
        <Row gutter={[5, 20]}>
          {graphsData.map(graphData => {
            const { id_graph, cols, order_index } = graphData
            return (
              <Col key={id_graph} xs={24} sm={24} xl={cols}>
                <DragManagment
                  setInitialGraphs={setInitialGraphs}
                  reOrderGraph={reOrderGraph}
                  key={reRender}
                  dragReMap={dragReMap}
                  simpleReMap={simpleReMap}
                  id={order_index}
                  graphData={graphData}
                  allGraphsData={graphsData}
                  formData={formData}
                  onChangeItemValue={onChangeItemValue}
                  onChangeSelectItem={onChangeSelectItem}
                  dragMode={dragMode}
                  editIndex={editIndex}
                  handleEditGraph={handleEditGraph}
                  changeDragMode={changeDragMode}
                  isNewGraph={isNewGraph}
                  saveGraph={saveGraph}
                  cancelGraph={cancelGraph}
                  deleteGraph={deleteGraph}
                />
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

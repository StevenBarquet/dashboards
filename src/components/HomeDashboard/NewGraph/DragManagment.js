/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
// Comps
import GraphContent from './GraphContent'
import NewGraphForm from './NewGraphForm'

const DragManagment = props => {
  const {
    graphData,
    allGraphsData,
    id,
    setInitialGraphs,
    reOrderGraph,
    dragMode,
    editIndex,
    dragReMap,
    // for child components only
    handleEditGraph,
    simpleReMap,
    formData,
    onChangeItemValue,
    onChangeSelectItem,
    changeDragMode,
    isNewGraph,
    saveGraph,
    cancelGraph,
    deleteGraph,
  } = props
  const [contStyle, setContStyle] = useState('graph-container')
  useEffect(() => {
    if (editIndex !== -1) {
      setContStyle('graph-container-big')
    } else {
      setContStyle('graph-container')
    }
  }, [editIndex])
  useEffect(() => setPosition(), [])
  function setPosition() {
    const element = document.getElementById(id)
    const rect = element.getBoundingClientRect()
    const {
      id_graph,
      title,
      description,
      aggregations,
      cols,
      type,
      query,
    } = graphData
    const graphDataWithPosition = {
      order_index: id,
      x: parseInt(rect.right, 10),
      y: parseInt(rect.top, 10),
      id_graph,
      title,
      description,
      aggregations,
      cols,
      type,
      query,
    }
    // console.log('Position of element ', element, ' is: ', graphDataWithPosition)
    setInitialGraphs(graphDataWithPosition)
  }

  function handleDragFinish(e, data) {
    const currentDrag = {
      draggedX: data.x,
      draggedY: data.y,
      distanceFromOrigin: Math.sqrt(data.x * data.x + data.y * data.y),
    }

    const newPosition = getNewPosition(currentDrag, graphData)
    const nearest = getNearestGraph(allGraphsData, newPosition)
    // console.log('dragged to:\n', currentDrag)
    // console.log('current graph:', graphData)
    // console.log('new position = ', newPosition)
    // console.log('Nearest graph is: ', nearest)
    reOrderGraph(nearest.order_index, graphData.order_index)
    dragReMap(currentDrag)
  }

  function getNewPosition(currentDrag, currentGraph) {
    const newPosition = {
      newX: currentGraph.x + currentDrag.draggedX,
      newY: currentGraph.y + currentDrag.draggedY,
    }
    return newPosition
  }

  function getNearestGraph(graphs, draggedGraph) {
    const draggedVector = { x: draggedGraph.newX, y: draggedGraph.newY }
    let currentNear = { distance: 10000000, order_index: 0 }
    for (let i = 0; i < graphs.length; i++) {
      const element = graphs[i]
      const newDistance = get2VectorsDistance(element, draggedVector)
      if (newDistance < currentNear.distance) {
        currentNear = {
          distance: newDistance,
          order_index: element.order_index,
        }
      }
    }
    return graphs[currentNear.order_index]
  }

  function get2VectorsDistance(vectorA, vectorB) {
    const distance = Math.sqrt(
      (vectorB.x - vectorA.x) * (vectorB.x - vectorA.x) +
        (vectorB.y - vectorA.y) * (vectorB.y - vectorA.y)
    )
    return distance
  }

  const colWidth = graphData.cols
  // -------------------------------------RENDER----------------------------------------
  if (editIndex === id) {
    if (dragMode) {
      return (
        <Draggable onStop={handleDragFinish}>
          <div
            id={id}
            className={`${contStyle} graph-container-current graph-container-drag`}
          >
            <NewGraphForm
              id={id}
              colWidth={colWidth}
              handleEditGraph={handleEditGraph}
              formData={formData}
              onChangeItemValue={onChangeItemValue}
              onChangeSelectItem={onChangeSelectItem}
              dragMode={dragMode}
              changeDragMode={changeDragMode}
              isNewGraph={isNewGraph}
              saveGraph={saveGraph}
              cancelGraph={cancelGraph}
              deleteGraph={deleteGraph}
            />
          </div>
        </Draggable>
      )
    }
    return (
      <div id={id} className={`${contStyle} graph-container-current`}>
        <NewGraphForm
          id={id}
          colWidth={colWidth}
          handleEditGraph={handleEditGraph}
          formData={formData}
          onChangeItemValue={onChangeItemValue}
          onChangeSelectItem={onChangeSelectItem}
          dragMode={dragMode}
          changeDragMode={changeDragMode}
          isNewGraph={isNewGraph}
          saveGraph={saveGraph}
          cancelGraph={cancelGraph}
          deleteGraph={deleteGraph}
        />
      </div>
    )
  }
  if (dragMode) {
    return (
      <Draggable
        axis="none"
        defaultPosition={{ x: 0, y: 0 }}
        onStop={handleDragFinish}
      >
        <div id={id} className={contStyle}>
          <GraphContent
            handleEditGraph={handleEditGraph}
            id={id}
            simpleReMap={simpleReMap}
            graphData={graphData}
            editIndex={editIndex}
          />
        </div>
      </Draggable>
    )
  }
  return (
    <div id={id} className={contStyle}>
      <GraphContent
        handleEditGraph={handleEditGraph}
        id={id}
        graphData={graphData}
        simpleReMap={simpleReMap}
        editIndex={editIndex}
      />
    </div>
  )
}

export default DragManagment

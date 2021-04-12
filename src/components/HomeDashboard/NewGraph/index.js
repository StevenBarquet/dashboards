/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import React, { useReducer, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
// Others
import parseLabels from 'src/utils/parseLabels'
import {
  getAllGraphs,
  crateGraph,
  editGraph,
  deleteGraph,
  editOrderIndex,
} from 'src/actions/dashbords'
// form stuff
import genericFormReducer from 'src/utils/genericFormReducer'
import {
  ON_CHANGE,
  RESET_FORM,
  SET_VALIDATE,
  ASSING_DATA,
} from 'src/actions/actionTypes'
import parseJoyErrors from 'src/utils/parseJoyErrors'
import newGraphSchema from './newGraphSchema'
// Comps
import GraphsContainer from './GraphsContainer'
import { emptyGraph } from './graphsMock'

const typesR = {
  CHANGE_GRAPHS_ARRAY: 'CHANGE_GRAPHS_ARRAY',
  SET_EDIT_INDEX: 'SET_EDIT_INDEX',
  RE_MAP_GRAPHS: 'RE_MAP_GRAPHS',
  SET_DRAG_MODE: 'SET_DRAG_MODE',
  SET_NEW_GRAPH_MODE: 'SET_NEW_GRAPH_MODE',
  SET_CANCEL_NEW: 'SET_CANCEL_NEW',
  REFRESH_GRAPHS: 'REFRESH_GRAPHS',
  SET_RE_ORDERED: 'SET_RE_ORDERED',
}

function newGraphReducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case typesR.CHANGE_GRAPHS_ARRAY:
      return { ...state, graphsData: payload }

    case typesR.SET_EDIT_INDEX: {
      const { editIndex, dragMode } = payload
      return { ...state, editIndex, dragMode }
    }

    case typesR.SET_CANCEL_NEW:
      return {
        ...state,
        graphsData: [],
        dragMode: false,
        editIndex: -1,
        reRender: false,
        isNewGraph: false,
        reOrdered: false,
      }

    case typesR.RE_MAP_GRAPHS:
      return { ...state, reRender: !state.reRender }

    case typesR.SET_DRAG_MODE:
      return { ...state, dragMode: payload }

    case typesR.SET_NEW_GRAPH_MODE:
      return { ...state, isNewGraph: payload }

    case typesR.SET_RE_ORDERED:
      return { ...state, reOrdered: true, dragMode: false }

    case typesR.REFRESH_GRAPHS: {
      const { id_company, id_dashboard, graphsData } = payload
      return {
        ...state,
        id_company,
        id_dashboard,
        graphsData,
        reRender: !state.reRender,
      }
    }

    default:
      return { ...state }
  }
}

const initialForm = {
  hasFeedback: false,
  form: {
    title: '',
    description: '',
    type: '',
    cols: '',
    query: '',
  },
  validate: {},
}

const NewGraph = props => {
  const { next, dashboard } = props
  const initialState = {
    id_company: null,
    id_dashboard: dashboard.data.id_dashboard,
    graphsData: [],
    dragMode: false,
    editIndex: -1,
    reRender: false,
    isNewGraph: false,
    reOrdered: false,
  }
  const [state, dispatch] = useReducer(newGraphReducer, initialState)
  const [formData, dispatchForm] = useReducer(genericFormReducer, initialForm)
  // for make requests
  const dispatchReq = useDispatch()
  const onGetAllGraphs = form => dispatchReq(getAllGraphs(form))
  const onCrateGraph = someData => dispatchReq(crateGraph(someData))
  const onEditGraph = someData => dispatchReq(editGraph(someData))
  const onDeleteGraph = form => dispatchReq(deleteGraph(form))
  const onEditOrderIndex = form => dispatchReq(editOrderIndex(form))

  useEffect(() => reloadGraphs(), [])

  function reloadGraphs() {
    const id = state.id_dashboard
    onGetAllGraphs(id).then(res => {
      const { id_company, id_dashboard } = dashboard.data
      const { graphs } = res
      const payload = { id_company, id_dashboard, graphsData: graphs || [] }
      dispatch({ type: typesR.REFRESH_GRAPHS, payload })
    })
  }

  function onChangeItemValue(e) {
    clearErrorsForm()
    const { name, value } = e.target
    dispatchForm({ type: ON_CHANGE, payload: { name, value } })
  }

  function clearErrorsForm() {
    const { form } = formData
    const { validate, hasFeedback } = initialForm
    const payloadForm = {
      validate,
      hasFeedback,
      form,
    }
    dispatchForm({ type: ASSING_DATA, payload: payloadForm })
  }

  function onChangeSelectItem(value, name) {
    dispatchForm({ type: ON_CHANGE, payload: { name, value } })
  }

  function setInitialGraphs(objData) {
    const { order_index } = objData
    const newGraphs = state.graphsData
    newGraphs[order_index] = objData
    dispatch({ type: typesR.CHANGE_GRAPHS_ARRAY, payload: newGraphs })
  }

  function reOrderGraph(indexA, indexB) {
    // indexA will be the new position of dragged graph
    // console.log('Entra reOrderGraph con indexs: ', indexA, indexB)
    const { graphsData } = state
    // console.log('original graphs  array: ', graphsData)
    const graphA = {
      ...graphsData[indexB],
      order_index: indexA,
      x: graphsData[indexA].x,
      y: graphsData[indexA].y,
    }

    const graphB = {
      ...graphsData[indexA],
      order_index: indexB,
      x: graphsData[indexB].x,
      y: graphsData[indexB].y,
    }

    const newGraphs = buildNewGraphs(graphA, indexA, graphB, indexB, graphsData)
    console.log('reOrdered graphs  array: ', newGraphs)

    const payload = {
      dragMode: true,
      editIndex: indexA,
    }
    dispatch({ type: typesR.SET_EDIT_INDEX, payload })
    dispatch({ type: typesR.SET_RE_ORDERED })
    dispatch({ type: typesR.CHANGE_GRAPHS_ARRAY, payload: newGraphs })
    simpleReMap()
  }

  function buildNewGraphs(graphA, indexA, graphB, indexB, graphs) {
    const newArray = []
    for (let index = 0; index < graphs.length; index++) {
      const element = graphs[index]
      if (index === indexA) {
        newArray.push(graphA)
      } else if (index === indexB) {
        newArray.push(graphB)
      } else {
        newArray.push(element)
      }
    }
    return newArray
  }

  function simpleReMap() {
    dispatch({ type: typesR.RE_MAP_GRAPHS })
    console.log('Entró reMap')
  }

  function dragReMap(dragData) {
    const { distanceFromOrigin } = dragData
    if (distanceFromOrigin > 85) {
      simpleReMap()
    }
  }

  function handleNewGraph() {
    window.scrollTo(0, 100000)
    dispatch({ type: typesR.SET_NEW_GRAPH_MODE, payload: true })
    const { graphsData } = state
    const order_index = graphsData.length
    const newEmptyGraph = {
      ...emptyGraph,
      order_index,
    }
    const newGraphs = graphsData
    newGraphs.push(newEmptyGraph)
    handleEditGraph(order_index)
  }

  function handleEditGraph(id) {
    // Active edit mode in the selected graph or open form to create new graph
    const payload = {
      dragMode: false,
      editIndex: id,
    }
    dispatch({ type: typesR.SET_EDIT_INDEX, payload })
    const { graphsData } = state
    if (graphsData.length === 0) {
      dispatchForm({ type: RESET_FORM, payload: initialForm })
    } else {
      const { type, title, cols, description, id_graph, query } = graphsData[id]
      const { validate, hasFeedback } = formData
      const payloadForm = {
        validate,
        hasFeedback,
        form: { type, title, cols, description, id_graph, query },
      }
      dispatchForm({ type: ASSING_DATA, payload: payloadForm })
    }
    simpleReMap()
  }

  function saveGraph(isNewGraph) {
    const validForm = validateForm()
    console.log('Formdata en save: ', formData)
    if (validForm) {
      if (isNewGraph) {
        const { graphsData } = state
        const newOrderIndex = graphsData.length - 1
        createGraph(newOrderIndex, validForm)
      } else {
        editGraphFront(validForm)
      }
    }
  }

  function editGraphFront(validForm) {
    const { editIndex, id_dashboard } = state
    const someData = { order_index: editIndex, ...validForm, id_dashboard }
    onEditGraph(someData).then(() => {
      const { reOrdered } = state
      if (reOrdered) {
        changeOrder()
      } else {
        cancelGraph()
      }
    })
  }

  function changeOrder() {
    const { graphsData } = state
    const order = graphsData.map(item => {
      const { order_index, id_graph } = item
      return { order_index, id_graph }
    })
    onEditOrderIndex({ order }).then(() => cancelGraph())
  }

  function createGraph(order_index, validForm) {
    const { id_dashboard } = state
    const someData = { id_dashboard, order_index, ...validForm }
    onCrateGraph(someData).then(() => {
      cancelGraph()
    })
  }

  function parseQuery() {
    try {
      const { validate, hasFeedback, form } = formData
      const payloadForm = {
        validate,
        hasFeedback,
        form: { ...form, query: JSON.parse(form.query) },
      }
      dispatchForm({ type: ASSING_DATA, payload: payloadForm })
      return payloadForm.form
    } catch (err) {
      return false
    }
  }

  function validateForm() {
    // validates the form and return true if valid data
    const { error } = newGraphSchema.validate(formData.form, {
      abortEarly: false,
    })
    const parsedForm = parseQuery()
    if (error) {
      dispatchForm({
        type: SET_VALIDATE,
        payload: parseJoyErrors(error.details),
      })
      return false
    }
    if (!parsedForm) {
      const errorMessage = {
        query: { message: 'El query no es válido', type: 'custom.queryFalse' },
      }
      dispatchForm({
        type: SET_VALIDATE,
        payload: errorMessage,
      })
      return false
    }
    console.log('FormDAta en validate: ', parsedForm)
    return parsedForm
  }

  function cancelGraph() {
    dispatch({ type: typesR.SET_CANCEL_NEW })
    clearErrorsForm()
    reloadGraphs()
  }

  function deleteGraphFront() {
    const { editIndex, graphsData } = state
    const { id_graph } = graphsData[editIndex]
    onDeleteGraph(id_graph).then(() => {
      cancelGraph()
    })
  }

  function changeDragMode(flag) {
    dispatch({ type: typesR.SET_DRAG_MODE, payload: flag })
  }

  return (
    <Row gutter={[10, 30]}>
      <Col span={6} offset={9}>
        <Button
          block
          disabled={state.editIndex !== -1}
          type="primary"
          onClick={handleNewGraph}
        >
          <>
            {parseLabels('forms.dash.graphs.createButton')}
            <PlusOutlined style={{ marginLeft: 10, fontSize: 18 }} />
          </>
        </Button>
      </Col>
      <Col span={24}>
        <GraphsContainer
          setInitialGraphs={setInitialGraphs}
          reOrderGraph={reOrderGraph}
          graphsData={state.graphsData}
          formData={formData}
          dragMode={state.dragMode}
          changeDragMode={changeDragMode}
          editIndex={state.editIndex}
          handleEditGraph={handleEditGraph}
          reRender={state.reRender}
          dragReMap={dragReMap}
          simpleReMap={simpleReMap}
          onChangeItemValue={onChangeItemValue}
          onChangeSelectItem={onChangeSelectItem}
          isNewGraph={state.isNewGraph}
          saveGraph={saveGraph}
          cancelGraph={cancelGraph}
          deleteGraph={deleteGraphFront}
        />
      </Col>
      <Col span={7}>
        <Button
          disabled={state.editIndex !== -1}
          block
          onClick={() => next(true)}
        >
          {parseLabels('button.prev')}
        </Button>
      </Col>
      <Col offset={10} span={7}>
        <Button
          disabled={state.editIndex !== -1}
          block
          type="primary"
          onClick={() => next()}
        >
          {parseLabels('button.next')}
        </Button>
      </Col>
    </Row>
  )
}

export default NewGraph

/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import React, { useReducer, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// Others
import { getAllGraphs } from 'src/actions/dashbords'
// Comps
import GraphsContainer from './GraphsContainer'

const typesR = {
  REFRESH_GRAPHS: 'REFRESH_GRAPHS',
}

function newGraphReducer(state, action) {
  const { type, payload } = action
  switch (type) {
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

const NewGraph = props => {
  const { dashboard } = props
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
  // for make requests
  const dispatchReq = useDispatch()
  const onGetAllGraphs = form => dispatchReq(getAllGraphs(form))

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

  return <GraphsContainer graphsData={state.graphsData} />
}

export default NewGraph

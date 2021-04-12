import React from 'react'
import CreateGroup from 'src/components/Companies/createGroup'
import { useDispatch, useSelector } from 'react-redux'
import {
  createGroup,
  getGroups,
  toogleCreateComp,
  updateGroup,
} from 'src/actions/companies'

const index = () => {
  const operationComp = useSelector(state => state.dashboards.operationComp)
  const groupData = useSelector(state => state.dashboards.group)
  const dispatch = useDispatch()
  const onCreateGroup = form => dispatch(createGroup(form))
  const onUpdateGroup = (id, toogle, initialState) =>
    dispatch(updateGroup(id, toogle, initialState))
  const onToogleCreate = () => dispatch(toogleCreateComp())
  const onGetGroups = () => dispatch(getGroups())

  return (
    <CreateGroup
      groupData={groupData}
      onUpdateGroup={onUpdateGroup}
      onToogleCreate={onToogleCreate}
      operationComp={operationComp}
      onCreateGroup={onCreateGroup}
      onGetGroups={onGetGroups}
    />
  )
}

export default index

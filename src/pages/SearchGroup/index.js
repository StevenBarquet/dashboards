import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  removeGroup,
  toogleCreate,
  getGroups,
  filterGroup,
  toogleUpdateComp,
  getOneGroup,
} from 'src/actions/companies'
import SearchGroup from 'src/components/SearchGroup'

const SearchGroupCont = () => {
  const groupData = useSelector(state => state.dashboards)
  const dispatch = useDispatch()
  const onGetGroups = form => dispatch(getGroups(form))
  const onRemoveGroup = form => dispatch(removeGroup(form))
  const onToogleCreate = form => dispatch(toogleCreate(form))
  const onFilterGroup = form => dispatch(filterGroup(form))
  const onGetOneGroup = form => dispatch(getOneGroup(form))
  const onToogleUpdate = () => dispatch(toogleUpdateComp())
  useEffect(() => {
    dispatch(getGroups())
  }, [])
  return (
    <div>
      <SearchGroup
        groupData={groupData}
        onToogleCreate={onToogleCreate}
        onRemoveGroup={onRemoveGroup}
        onGetGroups={onGetGroups}
        onFilterGroup={onFilterGroup}
        onToogleUpdate={onToogleUpdate}
        onGetOneGroup={onGetOneGroup}
      />
    </div>
  )
}

export default SearchGroupCont

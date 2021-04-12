import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HomeDashboard from 'src/components/HomeDashboard'
import {
  createGenData,
  toogleCreate,
  getOneDashboard,
  getUsers,
  toogleUpdate,
  getUsersByCompany,
  updateGenData,
  cretateVisualization,
} from 'src/actions/dashbords'
import { getCompanies } from 'src/actions/companies'

const HomeDashboardCont = () => {
  const dashboard = useSelector(current => current.dashboards)
  const dispatch = useDispatch()
  const onToogleCreate = () => dispatch(toogleCreate())
  const onToogleUpdate = () => dispatch(toogleUpdate())
  const onGetUsersDash = form => dispatch(getUsers(form))
  const onUpdateGenData = form => dispatch(updateGenData(form))
  const onGetOneDashboard = form => dispatch(getOneDashboard(form))
  const onCreateVisualization = form => dispatch(cretateVisualization(form))
  const onGetFilteredUsers = id => dispatch(getUsersByCompany(id))
  const oncreateGenData = form => dispatch(createGenData(form))

  useEffect(() => {
    dispatch(getCompanies())
  }, [])

  return (
    <>
      <HomeDashboard
        dashboard={dashboard}
        onGetUsersDash={onGetUsersDash}
        onCreateVisualization={onCreateVisualization}
        onGetFilteredUsers={onGetFilteredUsers}
        onUpdateGenData={onUpdateGenData}
        oncreateGenData={oncreateGenData}
        onGetOneDashboard={onGetOneDashboard}
        onToogleCreate={onToogleCreate}
        onToogleUpdate={onToogleUpdate}
      />
    </>
  )
}

export default HomeDashboardCont

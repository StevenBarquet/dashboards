import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDashboard,
  filterDashboard,
  toogleCreate,
  getOneDashboard,
  removeDashboard,
  getOneDashboardRead,
} from 'src/actions/dashbords'
import SearchDashboard from 'src/components/SearchDashboard'

const SearchDashboardCont = () => {
  const dashboardsData = useSelector(state => state.dashboards)
  const dispatch = useDispatch()
  const onToogleCreate = form => dispatch(toogleCreate(form))
  const onGetOneDashboard = form => dispatch(getOneDashboard(form))
  const onFilterDashboard = form => dispatch(filterDashboard(form))
  const onRemoveDashboard = form => dispatch(removeDashboard(form))
  const onGetDashboard = form => dispatch(getDashboard(form))
  const onGetOneDashboardRead = form => dispatch(getOneDashboardRead(form))

  useEffect(() => {
    dispatch(getDashboard())
  }, [])
  return (
    <div>
      <SearchDashboard
        onGetOneDashboard={onGetOneDashboard}
        dashboardsData={dashboardsData}
        onToogleCreate={onToogleCreate}
        onFilterDashboard={onFilterDashboard}
        onRemoveDashboard={onRemoveDashboard}
        onGetDashboard={onGetDashboard}
        onGetOneDashboardRead={onGetOneDashboardRead}
      />
    </div>
  )
}

export default SearchDashboardCont

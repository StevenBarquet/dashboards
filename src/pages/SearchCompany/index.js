import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  removeCompany,
  toogleCreate,
  getCompanies,
  filterCompany,
  getOneCompany,
  toogleUpdateComp,
  updateGroup,
} from 'src/actions/companies'
import SearchCompany from 'src/components/SearchCompany'

const SearchCompanyCont = () => {
  const companyData = useSelector(state => state.dashboards)
  const dispatch = useDispatch()
  const onGetCompanies = () => dispatch(getCompanies())
  const onRemoveCompany = form => dispatch(removeCompany(form))
  const onToogleCreate = form => dispatch(toogleCreate(form))
  const onFilterCompany = form => dispatch(filterCompany(form))
  const onGetOneCompany = id => dispatch(getOneCompany(id))
  const onUpdateGroup = id => dispatch(updateGroup(id))
  const onToogleUpdate = () => dispatch(toogleUpdateComp())
  useEffect(() => {
    dispatch(getCompanies())
  }, [])

  return (
    <div>
      <SearchCompany
        companyData={companyData}
        onToogleUpdate={onToogleUpdate}
        onToogleCreate={onToogleCreate}
        onGetCompanies={onGetCompanies}
        onRemoveCompany={onRemoveCompany}
        onFilterCompany={onFilterCompany}
        onUpdateGroup={onUpdateGroup}
        onGetOneCompany={onGetOneCompany}
      />
    </div>
  )
}

export default SearchCompanyCont

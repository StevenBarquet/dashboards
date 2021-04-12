import React from 'react'
import CreateCompany from 'src/components/Companies/CreateCompany'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCompany,
  getCompanies,
  toogleCreateComp,
  updateCompany,
} from 'src/actions/companies'

const index = () => {
  const operationComp = useSelector(state => state.dashboards.operationComp)
  const companyData = useSelector(state => state.dashboards.company)
  const dispatch = useDispatch()
  const onCreateCompany = form => dispatch(createCompany(form))
  const onUpdateCompany = (id, toogle, initialState) =>
    dispatch(updateCompany(id, toogle, initialState))
  const onToogleCreate = () => dispatch(toogleCreateComp())
  const onGetCompanies = () => dispatch(getCompanies())

  return (
    <CreateCompany
      companyData={companyData}
      onUpdateCompany={onUpdateCompany}
      onToogleCreate={onToogleCreate}
      operationComp={operationComp}
      onCreateCompany={onCreateCompany}
      onGetCompanies={onGetCompanies}
    />
  )
}

export default index

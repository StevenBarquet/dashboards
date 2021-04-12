import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateUser from 'src/components/OperationUser'
import { createUser, updateUser } from 'src/actions/user'
import {
  createCompany,
  createGroup,
  toogleCreate,
  getGroups,
  getCompanies,
} from 'src/actions/companies'

const CreateUserCont = () => {
  const dashboard = useSelector(state => state.dashboards)
  const operation = useSelector(state => state.user.operationType)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const onGetGroups = () => dispatch(getGroups())
  const onToogleCreate = () => dispatch(toogleCreate())
  const onGetCompanies = () => dispatch(getCompanies())
  const onUpdateUser = form => dispatch(updateUser(form))
  const onCreateGroup = form => dispatch(createGroup(form))
  const onCreateCompany = form => dispatch(createCompany(form))
  const onCreateUser = (form, initialState) =>
    dispatch(createUser(form, initialState))
  useEffect(() => {
    dispatch(getGroups())
    dispatch(getCompanies())
  }, [])

  return (
    <CreateUser
      operation={operation}
      user={user}
      onCreateUser={onCreateUser}
      onCreateCompany={onCreateCompany}
      onToogleCreate={onToogleCreate}
      onCreateGroup={onCreateGroup}
      onGetCompanies={onGetCompanies}
      onGetGroups={onGetGroups}
      onUpdateUser={onUpdateUser}
      dashboard={dashboard}
    />
  )
}

export default CreateUserCont

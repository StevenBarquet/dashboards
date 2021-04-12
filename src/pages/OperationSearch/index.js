import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUsers,
  filterUser,
  getOneUser,
  removeUser,
  toogleCreate,
} from 'src/actions/user'
import SearchUser from 'src/components/SearchUser'

const SearchUserCont = () => {
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()
  const onGetOneUser = form => dispatch(getOneUser(form))
  const onGetUsers = () => dispatch(getUsers())
  const onToogleCreate = () => dispatch(toogleCreate())
  const onFilterUser = form => dispatch(filterUser(form))
  const onRemoveUser = form => dispatch(removeUser(form))
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      <SearchUser
        userData={userData}
        onToogleCreate={onToogleCreate}
        onGetOneUser={onGetOneUser}
        onFilterUser={onFilterUser}
        onRemoveUser={onRemoveUser}
        onGetUsers={onGetUsers}
      />
    </div>
  )
}

export default SearchUserCont

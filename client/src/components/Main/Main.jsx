import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoFromServer } from '../../redux/actions/accountsAC'
import { checkUser } from '../../redux/actions/userAC'
import AccountList from '../AccountList/AccountList'

export default function Main() {
  const dispatch = useDispatch()
  let accounts = useSelector(state => state.accounts)


  useEffect(() => {
    dispatch(getTodoFromServer())
  }, [])


  return (
    <div>
      {accounts && <AccountList accounts={accounts} />}
    </div>
  )
}

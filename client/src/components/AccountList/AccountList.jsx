import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AccountItem from '../AccountItem/AccountItem'
import style from './style.module.css'

export default function AccountList({accounts}) {
  const user = useSelector(state => state.user)
  if(user) {
    accounts = accounts.filter(el => el._id !== user.id)
  }
  return (
    <div className={style.listWrapp}>
      {accounts.map(account => <AccountItem key={account._id} account={account}/>)}
    </div>
  )
}


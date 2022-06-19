import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoFromServer } from '../../redux/actions/accountsAC'
import EditForm from '../EditForm/EditForm'
import style from './style.module.css'

function MyPage() {
  const user = useSelector(state => state.user)
  const [editSt, setEditSt] = useState(false)
  const dispatch = useDispatch()
  let account = useSelector(state => state.accounts)
  if (user) {
    account = account.filter(el => el._id === user.id)[0]
  }
  useEffect(() => {
    dispatch(getTodoFromServer())
  }, [])

  return (
    <>
      {account && <>{!editSt ? <div className={`${style.card}`}>{!account && <p>Load...</p>}
        <div className={style.avatarСircle}><img className={style.avatar} src={`http://localhost:3001${account.img}`} width="250" alt="" /></div>
        <div className={`${style.about}`}><p>{account.name}</p>
          <p>{account.email}</p>
          <p>{account.birthDate}</p>
          <p>{account.gender}</p>
          <button className='btn btn-primary' onClick={() => setEditSt(true)}>Редактировать</button>
        </div></div>
       : <EditForm account={account} setEditSt={setEditSt} />}</>}
    </>
  )
}

export default React.memo(MyPage)

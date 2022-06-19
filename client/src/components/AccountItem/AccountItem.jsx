import React from 'react'
import style from './style.module.css'

export default function AccountItem({ account }) {


  function _calculateAge(birthday) { // birthday is a date
    const now = new Date(); //Текущя дата
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
    const dob = new Date(birthday); //Дата рождения
    const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
    let age; //Возраст
    
    //Возраст = текущий год - год рождения
    age = today.getFullYear() - dob.getFullYear();
    //Если ДР в этом году ещё предстоит, то вычитаем из age один год
    if (today < dobnow) {
      age = age-1;
    }
    return  age
  }

  return (
    <div className={`${style.card}`}>

      <div className={style.avatarСircle}><img className={style.avatar} src={`http://localhost:3001${account.img}`} width="250" alt="" /></div>
      <div className={`${style.about}`}><p>{`name: ${account.name}`}</p>
        <p>{`age: ${_calculateAge(account.birthDate)}`}</p>
        <p>{account.birthDate}</p>
        </div>

    </div>
  )
}

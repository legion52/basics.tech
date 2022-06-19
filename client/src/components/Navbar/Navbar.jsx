import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from '../../redux/actions/userAC';


export default function Navbar() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = () => {
    dispatch(userLogout())
    navigate('/people')
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BasicsTech</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li><Link className="nav-link active" aria-current="page" to="/people">Аккаунты</Link></li>
            {!user ?
              
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Войти</Link></li>: <><li className="nav-item"><button className="btn btn-light" onClick={logoutHandler} aria-current="page" >Выйти</button></li><li>
                <Link className="nav-link active" aria-current="page" to="/account">Мой профиль</Link></li></>}
          </ul>
        </div>
      </div>
    </nav>
  )
}


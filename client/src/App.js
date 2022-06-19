import './App.css';
import { Routes, Route, } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import AuthUser from './components/ProtectedAuth/AuthUser'
import SignInForm from './components/SignInForm/SignInForm'
import Main from './components/Main/Main';
import Auth from './components/ProtectedAuth/Auth';
import { useDispatch } from 'react-redux';
import { checkUser } from './redux/actions/userAC';
import { useEffect } from 'react';
import MyPage from './components/MyPage/MyPage';

function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(checkUser())
    
  }, [])
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<AuthUser>
          <Auth/>
        </AuthUser>} />
        <Route path='/people' element={<Main/> } />
        <Route path='/account' element={<MyPage/>} />
      </Routes>
    </div>
  );
}

export default App;         

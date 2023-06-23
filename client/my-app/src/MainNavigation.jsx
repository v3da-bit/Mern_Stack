import Home  from './components/Home';
import React, { useContext } from 'react'
import { Route, Routes, useLocation, useNavigate,Navigate } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/profile/Profile';
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';
import { UserContext } from './App';
import Cookies from 'js-cookie';



function MainNavigation() {
    const path=useLocation()
    let valid=null
    const Redirect=<Navigate to={"/login"} />
    const token = Cookies.get('userData')
    console.log(token==undefined)
    if (token!=undefined) {
      valid=true
      
    }else{
      valid=false
      
    }
  
  
    // if(path.pathname==='/'){
    //     console.log("the if condition")
    //     navigate('/signup')
    // }
    console.log(valid);
  return (
    <Routes>
        <Route path='/' element={valid?<Home/>:Redirect}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/about' element={valid?<About/>:Redirect}/>
        <Route path='/contact' element={valid?<Contact/>:Redirect}/>
        <Route path='/profile' element={valid?<Profile/>:Redirect} />
        <Route path='/logout' element={valid?<Logout/>:Redirect}/>
        <Route path='*' element={<ErrorPage/>}/>

    </Routes>
  )
}

export default MainNavigation
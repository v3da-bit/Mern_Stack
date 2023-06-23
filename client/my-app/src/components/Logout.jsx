import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

function Logout() {

    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()

    const logOut=async()=>{
        const token = Cookies.get('userData')
        const headers = { 'token': token };
        await axios.get('http://localhost:3000/logout',{headers}).then((res)=>{
            console.log(res)
            setTimeout(() => {
                toast.success("successfully logout");
              }, 200);        
            Cookies.remove('userData')
            localStorage.removeItem('userData')
            dispatch({ type: "USER", payload: false })
            navigate('/login')
        }).catch((err)=>{
            console.log(err)
        })
    }
  useEffect(()=>{
    logOut()
  },[]) 
  return(
    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer/>
    </section>
  )
        
    
}

export default Logout
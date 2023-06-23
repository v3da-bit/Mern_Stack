import axios from 'axios'
import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App'
  

function Login() {
  const {state,dispatch}=useContext(UserContext)
  const navigate = useNavigate()
  let userToken;
  const [userData,setUserData]=useState({
    email:"",
    password:""
  })

  const handleInputs=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setUserData({...userData,[name]:value})
  }
const postData=async (e)=>{
  e.preventDefault()
  const response= await axios.post('http://localhost:3000/signin',userData,{headers:{"name":"ved"}}).then((res)=>{
    console.log(res.data.token)
    dispatch({type:"USER",payload:true})
      userToken=res.data.token
      setTimeout(() => {
        toast.success("successfully logged in");
      }, 200);
      Cookies.set("userData",userToken,{
        expires:new Date(Date.now()+9999999999),
        secure:false,
        sameSite:"strict"
      })
      localStorage.setItem('userData',JSON.stringify(userToken))

      navigate('/')
      return res
      
  }).catch(err=>{
    console.log(err)
    setTimeout(() => {
      toast.error("Credentials not valid");
    }, 200);
   
  })
}
  
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen max-sm:px-0,py-0 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="">
              <div>
                <input type="email" name="email" id="email" value={userData.email} onChange={handleInputs} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <input type="password" name="password" id="password" value={userData.password} onChange={handleInputs} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" onClick={postData} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="" onClick={() => {
                  navigate('/signup')
                }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

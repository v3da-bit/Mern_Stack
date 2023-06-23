import React, { useContext, useEffect, useState } from 'react'
import {Login} from './Login'
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../App';

function Home() {
  const [userData,setUserData]=useState('');
  const {state,dispatch}=useContext(UserContext)
  
  const token = Cookies.get('userData')
  console.log(token==undefined)
  if (token!=undefined) {
    dispatch({type:"USER",payload:true})
    
  }else{
    dispatch({type:"USER",payload:false})
    
  }
  const callAbout = async () => {

    
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.get('http://localhost:3000/about', { headers }).then((res) => {
      setUserData(res.data)
      
  }).catch((err)=>{
    console.log(err)
  })
}
useEffect(()=>{
  callAbout()
  
},[])
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 max-lg:py-14 mx-auto md:h-screen lg:py-0">
                  <h1 className="text-white text-4xl">Welcome to Home Page</h1>
                  <h1 className="text-white text-4xl font-sans">{userData.name}</h1>
                  <h1 className="text-white text-4xl font-sans">we are {userData.work}</h1>
        </div>
        </section>
  )
}

export default Home
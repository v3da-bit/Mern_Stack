import React, { useContext, useEffect, useState } from 'react'
import image1 from './images/Screenshot 2023-03-04 002840.jpg'
import { BrowserRouter, Link, useNavigate } from 'react-router-dom'
import ProfileNavbar from './profile/ProfileNavbar'
import MainNavigation from '../MainNavigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserContext } from '../App'

function About() {
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  
  const token = Cookies.get('userData')
  console.log(token)
  if (token!=undefined) {
    dispatch({type:"USER",payload:true})
    
  }else{
    dispatch({type:"USER",payload:false})
    
  }
  
  const [data,setData]=useState({
    id:'',
    name:'',
    email:'',
    phone:'',
    work:''
  })
  const check=()=>{
    console.log(data)
  }
  const callAbout=async()=>{
    const token=Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response=await axios.get('http://localhost:3000/about',{headers}).then((res)=>{
      const userData=res.data
      setData({
        id:userData._id,
        name:userData.name,
        email:userData.email,
        phone:userData.phone,
        work:userData.work
      })
      
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    callAbout()
    
  },[])
  return (
    <section className="bg-white dark:bg-gray-900 w-full h-[100vh]">
      <div className="py-14 lg:py-20 px-4 mx-auto max-w-screen-md shadow-black shadow-sm">
        <div className="grid grid-flow-row"></div>
        <div className="grid grid-flow-col">
          <div className="image">
            <img src={image1} alt="ms" style={{
              maxHeight: "200px",
              maxWidth: "150px"
            }} />
          </div>
          <div className="content grid grid-flow-row">
            <div className="name">
              <h1 className="text-white">Vedant Khamar</h1>
            </div>
            <div className="tech">
              <h1 className="text-white">Web Developer</h1>
            </div>
            <div className="age">
              <h1 className="text-white">Age:20</h1>
            </div>


          </div>
        </div>
        <div className='grid mt-4 text-white'>

          
          <ProfileNavbar id={data.id} name={data.name} email={data.email} phone={data.phone} work={data.work}/>
          
          


        </div>

      </div>
    </section>
  )
}

export default About
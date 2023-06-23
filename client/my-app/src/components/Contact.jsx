import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import { UserContext } from '../App'


function Contact() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    subject:'',
    message:''
  })
  const {state,dispatch}=useContext(UserContext)
  
  const token = Cookies.get('userData')
  console.log(token)
  if (token!=undefined) {
    dispatch({type:"USER",payload:true})
    
  }else{
    dispatch({type:"USER",payload:false})
    
  }
  

  const callAbout = async () => {

    const token = Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.get('http://localhost:3000/about', { headers }).then((res) => {
      const userData = res.data
      console.log(userData._id)
      setData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    callAbout()
    
  },[])
  const handleInputs=(e)=>{
    
    const name=e.target.name
    const value=e.target.value
    setData({...data,[name]:value})
  }
  const contactUs=async(e)=>{
    e.preventDefault()
    const token = Cookies.get('userData')
    console.log(data);
    const headers = { 'token': token };
    const {name,email,phone,subject,message}=data
    const response=await axios.post('http://localhost:3000/contact',{name,email,phone,subject,message},{headers}).then((res)=>{
      console.log(res.status)
      setTimeout(() => {
        toast.success("successfully submitted the query");
      }, 200);
    }).catch((err)=>{
      console.log(err)
      setTimeout(() => {
        toast.error("Credentials not valid");
      }, 200);
    })
  }
  
  return (
    <section className="bg-white dark:bg-gray-900 w-full h-[100vh] flex">
      <ToastContainer/>
      <div className="py-16 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <div className='grid grid-flow-col h-14 max-sm:grid-flow-row'>
          <div>
            <p className='text-white'>vedantkhamar975@gmail.com</p>
          </div>
          <div>
            <p className='text-white'>+91 9104527828</p>
          </div>
        </div>
        <form action="#" className="space-y-8">
          <div className="grid grid-flow-col gap-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
              <input type="text" id="name" name='name' value={data.name} onChange={handleInputs} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Name" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" name='email' value={data.email} onChange={handleInputs} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone No.</label>
              <input type="number" id="phone" name='phone' value={data.phone} onChange={handleInputs} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Phone No." required />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
            <input type="text" id="subject" name="subject" value={data.subject} onChange={handleInputs} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
            <textarea id="message" name="message" value={data.message} onChange={handleInputs} rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" onClick={contactUs} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
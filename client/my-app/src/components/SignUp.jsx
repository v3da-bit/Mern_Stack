import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Input, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function SignUp() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        number: "",
        profession: "",
        password: "",
        cpassword: ""

    })
    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }
    const postData = async (e) => {
        e.preventDefault()
        console.log("post data called")
        if (user.password === user.cpassword) {


            const respose = await axios.post(
                'http://localhost:3000/register'


                , {
                    name: user.name,
                    email: user.email,
                    phone: user.number,
                    work: user.profession,
                    password: user.password,
                    cpassword: user.cpassword
                }).then((res) => {
                     console.log(res) 
                     setTimeout(() => {
                        toast.success("successfully logged in");
                      }, 200);
                
                      navigate('/login')
                    })
                .catch((err) => {
                    
                    console.log(err) 
                    setTimeout(() => {
                        toast.error("credentials error");
                      }, 200);
                })
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <ToastContainer/>
                <div className="flex flex-col items-center justify-center px-6 py-8 max-lg:py-14 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form method='POST' className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <input type="text" value={user.name} name="name" id="name" onChange={handleInputs} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required="" />
                                </div>
                                <div>
                                    <input type="email" value={user.email} name="email" id="email" onChange={handleInputs} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email" required="" />
                                </div>
                                <div>
                                    <input type="number" value={user.number} name="number" id="number" onChange={handleInputs} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your MO. Number" required="" />
                                </div>
                                <div>
                                    <input type="text" value={user.profession} name="profession" onChange={handleInputs} id="profession" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Profession" required="" />
                                </div>
                                <div>
                                    <input type="password" value={user.password} name="password" id="password" onChange={handleInputs} placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <input type="confirm-password" value={user.cpassword} name="cpassword" id="confirm-password" onChange={handleInputs} placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button onClick={postData} type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="" onClick={() => {
                                        navigate('/login')
                                    }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp
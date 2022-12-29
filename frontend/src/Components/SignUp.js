import React, { useState,useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
//import axios from 'axios'
const SignUp = () => {

    const [name, setName]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [cpassword, setCpassword]=useState();

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/dashboard');
        }
    },[]);

    const sendRequest = async () => {
        const resp = await fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email:email,
            password:password,
            cpassword:cpassword
          })
        })
        
        const data = await resp.json();
        return data;
        
        // .then(response => {
        //   if (response.ok) {
        //     return response.json();
        //   }
        //   throw new Error('Request failed.');
        // }).then(data => {
        //   //console.log(data);
        //   //localStorage.setItem('user', JSON.stringify(data));
        //   return data;
        // }).catch(error => {
        //   console.error(error);
        // });
  
    }

    // const sendRequest = async () => {
    //     const resp = await axios.post('http://localhost:4000/api/register',{
    //         name: name,
    //         email:email,
    //         password:password,
    //         cpassword:cpassword
    //     }).catch(err=>console.log(err));

    //     const data = await resp.data;
    //     return data;
    // }
    const collectData = (e) => {
        e.preventDefault();
        
        const mail = /\S+@\S+\.\S+/.test(email);

        // if(password != cpassword){
        //     alert("Password is not Matching");
        //     return;
        // }

        if(!mail){
            alert("Invalid Email")
            return;
        }
        //send http request
        sendRequest().then(()=>{
            navigate('/signin')
        }).catch( (err)=>{alert("Something Went Wrong")});
        // console.log(name,email,password,cpassword);

        // let result = await fetch("http://localhost:5000/register",{
        //     method:'post',
        //     body: JSON.stringify({name,email,password,cpassword}),
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // });
        
        // result= await result.json();
        // // console.log(result.status);
        // // localStorage.setItem("user",JSON.stringify(result));


        // if(result){
        //     alert("Registeration Successful");
        //     navigate("/signin");
        // }else{
        //     alert("User");
        // }
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-auto h-12 w-auto w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                        </a>
                        <h2 className="dark:text-white mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up to your account</h2>
                    </div>
                    
                        
                        <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password should be more than 6 characters"
                                />
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    value={cpassword}
                                    onChange={(e)=>setCpassword(e.target.value)}
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm-Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="dark:text-white ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={collectData}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign Up
                            </button>
                        </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
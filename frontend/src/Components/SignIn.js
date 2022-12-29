import React, { useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/dashboard');
    }
  }, []);


  const sendRequest = async () => {
    const resp = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const data = await resp.json();

    console.log(data)

    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data;

    // .then(response => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   throw new Error('Request failed.');
    // }).then(data => {
    //   console.log(data);
    //   localStorage.setItem('user', JSON.stringify(data));
    // }).catch(error => {
    //   console.error(error);
    // });

  }


//   const sendRequest = async () => {
//     const resp = await axios.post('http://localhost:4000/api/login',{
//         email:email,
//         password:password,
//     }).catch(err=>console.log(err));

//     const data = await resp.data;
//     if(data){
//       localStorage.setItem('user', JSON.stringify(data));
//     }
//     return data;

// }

const handleLogin = async (e) => {
  e.preventDefault();

  sendRequest().then(() => {
    navigate('/dashboard')
  }).catch((err) => { console.log(err) });

  // let result = await fetch("http://localhost:5000/login", {
  //   method: 'post',
  //   body: JSON.stringify({ email, password }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  // result = await result.json();
  // if (result) {
  //   localStorage.setItem('user', JSON.stringify(result));
  //   navigate("/dashboard");
  // } else {
  //   alert("Invalid Email & Password")
  //   navigate("/signin");
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
          <h2 className="dark:text-white mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
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
            <Link to="/signup">
              <small className='hover:font-bold'>Don't have account?</small>
            </Link>
            <button
              onClick={handleLogin}
              type="submit"
              className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)
}

export default SignIn
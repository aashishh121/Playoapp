
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setDarkTheme, darkTheme }) => {
  // const [user,setUser] = useState('');
  const navigate = useNavigate();

  const auth = localStorage.getItem('user');

  // const sendRequest = async () => {
  //   const resp = await axios.get('http://localhost:5000/api/user',{
  //     withCredentials:true
  //   }).catch(err => console.log(err));
  //   const data = await resp.data;
  //   return data;
  // }

  // useEffect(()=>{
  //   sendRequest().then((data)=>SpeechSynthesisUtterance(data.user));
  // })

  const logOut = () => {
    localStorage.clear();
    navigate('/signin');
  }

  return (
    <>
      <header className=" border-b dark:border-gray-700 border-gray-200f text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className=" dark:text-white ml-3 text-xl">Playo App</span>
            </a>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link to="/"><a className="mr-5 dark:text-white hover:cursor-pointer hover:border-b hover:font-bold">Home</a></Link>
            <Link to="/events"><a className="mr-5 dark:text-white hover:cursor-pointer hover:border-b hover:font-bold">Events</a></Link>
            <Link to="/create"><a className="mr-5 dark:text-white hover:cursor-pointer hover:border-b hover:font-bold">Create Events</a></Link>
            <Link to="/myevent"><a className="mr-5 dark:text-white hover:cursor-pointer hover:border-b hover:font-bold">My Events</a></Link>
            <Link to="pending"><a className="mr-5 dark:text-white hover:cursor-pointer hover:border-b hover:font-bold">Pending</a></Link>
          </nav>
          <button onClick={() => setDarkTheme(!darkTheme)} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">{darkTheme ? '💡' : '🌚'}
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          {auth ?
            (<Link to="/signin">
              <button onClick={logOut} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-4">Sign Out
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                </svg>
              </button>
            </Link>)
            :
            (<Link to="/signin">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-4">Sign In
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                </svg>
              </button>
            </Link>)
          }
        </div>
      </header>
    </>
  )
}

export default Navbar
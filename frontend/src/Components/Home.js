import React from 'react'
import {Link,useNavigate} from 'react-router-dom';

const Home = () => {
  const auth = localStorage.getItem('user');

  const navigate = useNavigate();

  const logOut = () =>{
    localStorage.clear();
    navigate('/signin');
  }
  return (
    <>
      <div> 
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="dark:text-white title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">India's No.1 Online
                <br className="dark:text-white hidden lg:inline-block" />Playo App
              </h1>
              <p className="dark:font-bold mb-8 leading-relaxed">Created Playo App Using React and Node JS. CRUD Operation Is Used In This Project. And Sign In & Sign Up Authentication Is Used With The Help Of MERN Stack. Axios and Fetch API Are Used In This Project. Tailwind Is Used For Cascading Style Sheets</p>
              <div className="flex justify-center">
                <Link to="/dashboard"><button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Go To Dashboard</button></Link>
                {auth ?
              (<Link to="/signin">
              <button onClick={logOut} className="inline-flex items-center bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-4">Sign Out
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                </svg>
              </button>
              </Link>)
              :
              (<Link to="/signup">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-4">Sign Up
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                </svg>
              </button>
              </Link>)
          }
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img className="object-cover object-center rounded" alt="hero" src="book.svg" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home 
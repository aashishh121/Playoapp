import React, { useEffect, useState } from 'react'

export const Pending = () => {

  const [books, setBooks] = useState([]);
  const [pending,setPending] = useState([]);

  const local  = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getBooks();
    handlePending();
  }, []);

  const getBooks = async () => {
    let result = await fetch("http://localhost:4000/events");
    result = await result.json();
    setBooks(result);
  }

  const handlePending = () =>{
    let data = books.filter((value)=>{
      if(value.pendingPlayers.includes(local.existingUser.email)){
        return value ;
      }
    })
    console.log(data);
    setPending(data);
  }

  return (
    <>
      <div className="mt-3 ml-72 mr-72  ">
        <div className="flex border-2 rounded ">
          <button className="flex items-center justify-center px-4 border-r">
            <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div className='flex flex-wrap border-box card align-items-center m-10 pl-20 pr-20 pt-6'>
        {pending.length > 0 ? (
          pending.map((item, i) => (
            <>
              <div key={item._id} style={{ width: "200px" }} className='mr-4 border text-center border-2 p-4 hover:border-4 hover:border-orange-700'>

                <div>
                  <p>
                    <span className='text-gray-400 font-bold'>
                      {item.eventName}
                    </span><br />
                    <small>Organize By {item.organizerName}</small>
                  </p>
                  <p className='text-center'>
                    {item.description}
                  </p>
                </div>
                <p className='text-center'>
                    Pending Request
                  </p>
              </div>
            </>
          ))
        ) :
          (<>
            <div>
              <h1>Empty Dashboards</h1>
            </div>
          </>)
        }
      </div>
    </>
  )
}

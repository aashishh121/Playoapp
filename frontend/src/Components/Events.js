import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export const Events = () => {

    const [books, setBooks] = useState([]);
    const auth  = localStorage.getItem('user')
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        let result = await fetch("http://localhost:4000/events");
        result = await result.json();
        setBooks(result);

        console.log(result);
    }

    const handleRequest = async (id) =>{
        //e.preventDefault();
        const local = JSON.parse(localStorage.getItem('user'))
        let result = await fetch(`http://localhost:4000/request/${id}`,{
            method:"PUT",
            body:JSON.stringify({email:local.existingUser.email}),
            headers:{
                'Content-Type':'Application/json'
            }
        });

        result = await result.json();
        console.log(result);

        if(result){
            alert("Request Submitted");
        }


    }

    const deleteProduct = async (id) => {
        if(auth){
                let result = await fetch(`http://localhost:4000/events/${id}`, {
                method: "Delete"
            });

            result = await result.json();

            if (result) {
                alert("Product deleted");
                getBooks();
            }
            console.log(id);
        }else{
            navigate("/signin")
        }
    }
    console.log(books);

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`);
            result = await result.json();
            if (result) {
                setBooks(result);
            }
        } else {
            getBooks();
        }
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
                    <input onChange={searchHandle} type="text" className="px-4 py-2 w-full" placeholder="Search With Book Name or Author Name..." />
                </div>
            </div>
            <div className='flex flex-wrap border-box card align-items-center m-10 pl-20 pr-20 pt-6'>
                {books.length > 0 ? (
                    books.map((item, i) => (
                        <>
                            <div key={item._id} style={{width:"200px"}} className='mr-4 border text-center border-2 p-4 hover:border-4 hover:border-orange-700'>

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
                                <div className='mt-4'>
                                    <Link to={"/update/" + item._id}><button className='dark:text-white mr-3 p-1 dark:bg-blue-700 bg-blue-200 hover:bg-blue-300 border rounded-full hover:font-semibold'>Update</button></Link>
                                    <button onClick={() => deleteProduct(item._id)} className='dark:text-white mr-3 p-1 dark:bg-blue-700 bg-blue-200 hover:bg-blue-300 border rounded-full hover:font-semibold'>Delete</button>
                                </div>
                                <div className='mt-4'>
                                    <button onClick={() => handleRequest(item._id)} className='dark:text-white mr-3 p-1 dark:bg-blue-700 bg-blue-200 hover:bg-blue-300 border rounded-full hover:font-semibold'>Request to Join</button>
                                </div>
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

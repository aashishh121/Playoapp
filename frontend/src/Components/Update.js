import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid'

const Update = () => {
    const [eventName, setBookName]=useState('');
    const [description, setDescription]=useState('');
    const [organizerName, setAuthor]=useState('');
    const [numberofSeats, setImage]=useState('');
    const [timing,setTiming] = useState('');
    const [error,setError] = useState(false);

    const param = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getBooksDetail();
    },[])

    const getBooksDetail =async ()=>{
        let result = await fetch(`http://localhost:4000/events/${param.id}`);

        result = await result.json();

        console.log(result);
        setBookName(result.eventName);
        setDescription(result.description);
        setAuthor(result.organizerName);
        setImage(result.numberofSeats);
    }

    const updateProduct = async (e) =>{
        e.preventDefault();

        if(!eventName || !description || !organizerName || !numberofSeats){
            setError(true);
            return false;
        }

        let result = await fetch(`http://localhost:4000/events/${param.id}`,{
            method:"put",
            body:JSON.stringify({eventName,description,organizerName,numberofSeats,timing}),
            headers:{
                'Content-Type':'Application/json'
            }
        });

        result = await result.json();

        if(result){
            alert("Product Updated");
            navigate('/dashboard');
        }


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
                        <h2 className="dark:text-white mt-6 text-center text-3xl font-extrabold text-gray-900">Update Your Favourite Books</h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                                <label htmlFor="name" className="sr-only">
                                    Book Name
                                </label>
                                {error && !eventName && <small className="pt-0 text-red-600">Book name can't be blank</small>}
                                <input
                                    value={eventName}
                                    onChange={(e)=>{setBookName(e.target.value)}}
                                    id="bname"
                                    name="bname"
                                    type="text"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Book Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Description
                                </label>
                                {error && !description && <small className="pt-0 text-red-600">Description can't be blank</small>}
                                <input
                                    value={description}
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Description"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Author Name
                                </label>
                                {error && !organizerName && <small className="pt-0 text-red-600">Author name can't be blank</small>}
                                <input
                                    value={organizerName}
                                    onChange={(e)=>{setAuthor(e.target.value)}}
                                    id="author"
                                    name="author"
                                    type="text"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Author Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="sr-only">
                                    Image URL
                                </label>
                                {error && !numberofSeats && <small className="pt-0 text-red-600">Invalid URL</small>}
                                <input
                                    value={numberofSeats}
                                    onChange={(e)=>{setImage(e.target.value)}}
                                    id="img"
                                    name="img"
                                    type="url" 
                                    pattern="https?://.+"                                  
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Image URL"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={updateProduct}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>
  )
}

export default Update
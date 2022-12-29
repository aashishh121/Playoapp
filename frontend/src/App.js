import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';

import Navbar from './Navbar';
import Home from './Components/Home';
import CreateEvent from './Components/CreateEvent';
import { Myevent } from './Components/Myevent';
import { Pending } from './Components/Pending';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { Events } from './Components/Events';
import Update from './Components/Update';
import PrivateComponent from './Components/PrivateComponent';
import PageNotFound from './Components/PageNotFound';

function App() {

  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <>
    <BrowserRouter>
    <div className={darkTheme ? 'dark' : ""}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen" >
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Routes>
        <Route element={[<PrivateComponent />]}>
          <Route path="/create" element={[<CreateEvent />]} />
          <Route path="/update/:id" element={[<Update />]} />
        </Route>
      <Route path="/" element={[<Home />]} />
      <Route path="/myevent" element={[<Myevent />]} />
      <Route path="/pending" element={[<Pending />]} />
      <Route path="/signin" element={[<SignIn />]} />
      <Route path="/signup" element={[<SignUp />]} />
      <Route path="/events" element={[<Events />]} />
      <Route path="/*" element={[<PageNotFound />]} />
      </Routes>
      </div> 
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;


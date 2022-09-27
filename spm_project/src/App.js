// Import All React Related files here
import './App.css';
import * as React from 'react';


// Import All Router Links here
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// Import All Redux ToolKit here

// Import all the molecules files here
import Home from './molecule/home';
import Signin from "./molecule/signin";
import HRadmin from './molecule/hradmin';
import Manager from './molecule/manager';
import Navbar from './molecule/navbar';
import ProtectedRoutes from './ProtectedRoutes/protectedroutes';

// Import ALL material UI things here

function App() {
  return (
    <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/signin" element ={<Signin />} />
            <Route element = {<ProtectedRoutes />}>
              <Route path="/Hradmin" element = {<HRadmin/>}/>
              <Route path="/Manager" element = {<Manager/>}/>
            </Route>
          </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home.js'
import Login from './Pages/Login/Login.js';
import Register from './Pages/Register/Register.js';
import FullPlanTrip from './Pages/FullPlanTrip/FullPlanTrip.js';
import TripShow from './Pages/TripShow/TripShow.js';
import Invite from './Pages/Invite/Invite.js'
import './App.css'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="plan" element={<FullPlanTrip/>} />
        <Route path="/trip/:id/*" element={<TripShow/>} />
        <Route path="/:tripId/:inviteCode" element={<Invite/>} />
        <Route path="/*" element={<Home/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;

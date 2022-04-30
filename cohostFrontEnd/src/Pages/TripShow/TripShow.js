import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './TripShow.css'
import TripDetails from './components/TripDetails/TripDetails'
import GroceryList from './components/TripDetails/GroceryList'
import EditTrip from '../FullPlanTrip/EditTrip'
import TripGuests from './components/TripGuests/TripGuests'
import TripSchedule from './components/TripSchedule/TripSchedule'
import NewScheduleMark from './components/TripSchedule/newMark/NewScheduleMark'
import EditMark from './components/TripSchedule/EditMark/EditMark'
import { useSelector, useDispatch } from 'react-redux';
import { reset, checkUser } from '../../features/auth/authSlice';
import { getCurrentTrip, resetTrips } from '../../features/trip/tripSlice';
import Spinner from '../../spinner';

const TripShow = () =>{
    const { currentName, isTripLoading, isTripSuccess, isTripError } = useSelector((state)=>state.trip);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isError,isSuccess,message,isCompError} = useSelector((state)=>state.auth);
    const tripId = useParams().id;

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isCompError){
            toast.error(message)
            navigate('/login');
        }
        if(isTripSuccess){
            dispatch(resetTrips());
        }
        if(isTripError){
            navigate('/');
            toast.error('Could not find that trip');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, isTripSuccess, isTripError])

    useEffect(() => {
        const startUp = async() =>{
            await dispatch(checkUser());
            await dispatch(getCurrentTrip(tripId));
            dispatch(resetTrips());
        }
        startUp();
    }, []);



    if(isTripLoading){
        return(
            <Spinner/>
        )
    }
    
    return(
        <>
        {currentName && currentName!==null &&
            <div className = 'TripShow row'>
                <div id='show-header' className='page-header col-10 col-md-8'>
                    <button><Link to={`/`}><i className="fa-solid fa-angle-left fa-xl"></i></Link></button>
                    <h1>{currentName}</h1>
                    <div className="trip-nav">
                        <button><NavLink to={`details`}>Details</NavLink></button>
                        <button><NavLink to={`schedule`}>Schedule</NavLink></button>
                        <button><NavLink to={`guests`}>Guests</NavLink></button>
                    </div>
                </div>
                <div id='show-body' className='col-10 col-md-8'>
                    <Routes>
                        <Route path = "guests" element={<TripGuests/>}/>
                        <Route path = "details" element={<TripDetails/>}/>
                        <Route path = "details/edit" element={<EditTrip/>}/>
                        <Route path = "details/grocery" element={<GroceryList/>}/>
                        <Route path = "schedule/edit/:day" element={<EditMark/>}/>
                        <Route path = "schedule/:day" element={<NewScheduleMark/>}/>
                        <Route path = "schedule" element={<TripSchedule/>}/>
                    </Routes>
                </div>
            </div>
        }
        </>
    )
}

export default TripShow;
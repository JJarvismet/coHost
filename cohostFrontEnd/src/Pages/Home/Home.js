import TripBox from './components/TripBox/TripBox.js';
import PlanTrip from './components/PlanTrip/PlanTrip.js';
import { toast } from 'react-toastify';
import React, {useEffect, useState} from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset, checkUser } from '../../features/auth/authSlice';
import { myTrips, resetTrips, killTrip } from '../../features/trip/tripSlice';
import Spinner from '../../spinner';

const Home = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isError,isLoading,isSuccess,message,isCompError} = useSelector((state)=>state.auth);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isCompError){
            toast.error(message)
            navigate('/login');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    useEffect(() => {
        const startUp = async() =>{
            await dispatch(checkUser());
            await dispatch(myTrips());
            dispatch(resetTrips());
            dispatch(killTrip());
        }
        startUp();
    }, [])


    
    const onLogout = async() => {
        await dispatch(logout());
        dispatch(reset());
        navigate('/login');
    }

    if(isLoading){
        return <Spinner/>
    }

    return(
        <div className = 'Home row'>
            <div className="page-header col-10 col-md-8">
                <button onClick={onLogout} className='back-button'><i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i></button>
                <h1>Adventure awaits, {user && user.firstName}!</h1>                
            </div>

            <div className='col-10 col-md-8'>
                <PlanTrip/>
                <TripBox/>
            </div>
        </div>
    )
}

export default Home;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './FullPlanTrip.css';
import { useDispatch,useSelector } from 'react-redux';
import { reset, checkUser } from '../../features/auth/authSlice';
import { resetTrips, planTrip } from '../../features/trip/tripSlice';
import { toast } from 'react-toastify';
import { validateTripData } from './validateTripData';

const FullPlanTrip = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let routeLocation = useLocation();
    const seedInfo = routeLocation.state;
    const [name, setName] = useState(seedInfo.name);
    const [location, setLocation] = useState(seedInfo.location);
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [coverImage, setCoverImage] = useState();
    const {user,isError,isSuccess,message,isCompError} = useSelector((state)=>state.auth);
    const {isTripError,isTripLoading, isTripSuccess} = useSelector((state)=>state.trip);

    const tripData = {
        name,
        location,
        address,
        description,
        startDate,
        endDate,
        coverImage
    }

    const onClick = () =>{
        const isValid = validateTripData(tripData);
        if(isValid.valid){
            dispatch(planTrip(tripData));
        }else{
            toast.error(isValid.message)
        }
    }

    useEffect(()=>{
        if(isTripError){
            toast.error('Could not plan trip');
            navigate('/');
        }
        if(isTripSuccess){
            dispatch(resetTrips);
            navigate('/');
        }
    },[isTripError,isTripLoading,isTripSuccess])

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
            dispatch(resetTrips());
        }
        startUp();
    }, [])


    return(
        <div className="FullPlanTrip row">
            <div className="page-header col-10 col-md-8 col-xl-6">
                <button className='back-button'><Link to={`/`}><i className="fa-solid fa-angle-left fa-xl"></i></Link></button>
                <h1>Get Planning!</h1>
            </div>
            <div className="plan-trip-form col-10 col-md-8 col-xl-6">
                <div className="input-dub">
                    <input className="full-plan-form-item" type="text" placeholder='Trip Name' onChange={(e)=>{setName(e.target.value)}} value={seedInfo.name}/>
                    <input className="full-plan-form-item" type="text" placeholder='Location' onChange={(e)=>{setLocation(e.target.value)}} value={seedInfo.location}/>
                </div>
                <input className="full-plan-form-item" type="text" placeholder='Address' onChange={(e)=>{setAddress(e.target.value)}}/>
                <div className="input-dub">
                    <input className="full-plan-form-item" type="date" max='2025/01/01' placeholder='Start Date' onChange={(e)=>{setStartDate(e.target.value)}}/>
                    <input className="full-plan-form-item" type="date" max='2025/01/01' placeholder='End Date' onChange={(e)=>{setEndDate(e.target.value)}}/>                    
                </div>
                <input className="full-plan-form-item" type="text" placeholder='Cover Image Url' onChange={(e)=>{setCoverImage(e.target.value)}}/>
                <textarea className="full-plan-form-item" type="text" placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                <button id='lets-go' onClick={()=>{onClick()}}>Let's Go!</button>
            </div>
        </div>
    )
}

export default FullPlanTrip;
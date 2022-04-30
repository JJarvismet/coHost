import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validateTripData } from './validateTripData';
import { getCurrentTrip,editTrip,deleteTrip } from '../../features/trip/tripSlice';

const EditTrip = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentTrip,isTripSuccess} = useSelector((state)=>state.trip);
    const [name, setName] = useState(currentTrip.name);
    const [location, setLocation] = useState(currentTrip.location);
    const [address, setAddress] = useState(currentTrip.address);
    const [description, setDescription] = useState(currentTrip.description);
    const [coverImage, setCoverImage] = useState(currentTrip.coverImage);

    const tripData = {
        name,
        location,
        address,
        description,
        coverImage
    }

    const onClick = () =>{
        dispatch(editTrip({tripId:currentTrip._id,tripEdits:tripData}));
        dispatch(getCurrentTrip(currentTrip._id));
        navigate(`/trip/${currentTrip._id}/details`);
    }

    const killTrip = () =>{
        dispatch(deleteTrip(currentTrip._id));
        navigate('/');
    }


    return(
        <div className="EditTrip">
                <div className="edit-trip-form col-10 col-md-8 col-xl-6">
                <div className="input-dub">
                    <input className="edit-form-item" type="text" placeholder='Trip Name' onChange={(e)=>{setName(e.target.value)}} defaultValue={currentTrip.name}/>
                    <input className="edit-form-item" type="text" placeholder='Location' onChange={(e)=>{setLocation(e.target.value)}} defaultValue={currentTrip.location}/>
                </div>
                <input className="edit-form-item" type="text" placeholder='Address' onChange={(e)=>{setAddress(e.target.value)}} defaultValue={currentTrip.address}/>
                <input className="edit-form-item" type="text" placeholder='Cover Image Url' onChange={(e)=>{setCoverImage(e.target.value)}} defaultValue={currentTrip.coverImage}/>
                <textarea className="edit-form-item" type="text" placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}} defaultValue={currentTrip.description}/>
                <div className='edit-trip-btns'>
                    <button id="delete-trip" onClick={()=>{killTrip()}}>Delete Trip</button>
                    <button id='lets-go' onClick={()=>{onClick()}}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditTrip;
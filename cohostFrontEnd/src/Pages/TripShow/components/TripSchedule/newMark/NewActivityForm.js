import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import '../TripSchedule.css'
import { getCurrentTrip, postMark } from '../../../../../features/trip/tripSlice';
import validateMark from '../validateMark';
import { toast } from "react-toastify";



const NewActivityForm = () =>{
    const {currentTrip,currentTripLength} = useSelector((state)=>state.trip);
    const {user} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const day = useParams().day;
    const tripId = currentTrip._id;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [description, setDescription] = useState();

    const onSubmit = async(e) => {
        const data = {name, startTime, endTime, description, organizer:user, address}
        e.preventDefault();
        const isValid = validateMark(data);
        if(isValid.valid){
            dispatch(postMark({tripId,day,mark:{mark:'activity', data}}));
            dispatch(getCurrentTrip(tripId));
            navigate(`/trip/${tripId}/schedule`);
        }else{
            toast.error(isValid.message)
        }
    }

    return(
        <form className="mark-form" id='NewActivityForm' onSubmit={(e)=>{onSubmit(e)}}>
            <h3>{currentTripLength[0]}</h3>
            <div className="mark-container">
                <input className="mark-input" type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
                <span className="time-label"></span>
                <input className="mark-input" type="text" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>
            </div>
            <div className="mark-container">
                <input className="mark-input" type="time" name="" id="" onChange={(e)=>{setStartTime(e.target.value)}}/>
                <span className="time-label">to</span>
                <input className="mark-input" type="time" name="" id="" onChange={(e)=>{setEndTime(e.target.value)}}/>
            </div>
            <textarea className="mark-input" name="activity-description" id="activity-description" cols="30" rows="10" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            <button className="mark-success" type="submit">Add activity</button>
        </form>
    )
}

export default NewActivityForm;
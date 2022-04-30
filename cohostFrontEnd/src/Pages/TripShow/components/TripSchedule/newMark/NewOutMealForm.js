import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../TripSchedule.css'
import { getCurrentTrip, postMark } from '../../../../../features/trip/tripSlice';
import validateMark from "../validateMark";
import { toast } from "react-toastify";


const NewOutMealForm = () =>{
    const {currentTrip,currentTripLength} = useSelector((state)=>state.trip);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const day = useParams().day;
    const tripId = currentTrip._id;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const onSubmit = async(e) => {
        const data = {name, startTime, endTime, address}
        e.preventDefault();
        const isValid = validateMark(data);
        if(isValid.valid){
            dispatch(postMark({tripId, day, mark:{mark:'outMeal', data}}))
            dispatch(getCurrentTrip(tripId));
            navigate(`/trip/${tripId}/schedule`);
        }else{
            toast.error(isValid.message);
        }
    }

    return(
        <form className="mark-form" id='NewOutMealForm' onSubmit={(e)=>{onSubmit(e)}}>
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
            <button className="mark-success" type="submit">Add Meal</button>
        </form>
    )
}

export default NewOutMealForm;
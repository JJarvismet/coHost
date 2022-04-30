import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../TripSchedule.css'
import { getCurrentTrip, editMark, deleteMark } from '../../../../../features/trip/tripSlice';
import validateMark from "../validateMark";
import { toast } from "react-toastify";



const EditOutMealForm = (props) =>{
    const {markData} = props;
    const {currentTrip,currentTripLength} = useSelector((state)=>state.trip);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const day = useParams().day;
    const tripId = currentTrip._id;

    const [name, setName] = useState(markData.name);
    const [address, setAddress] = useState(markData.address);
    const [startTime, setStartTime] = useState(markData.startTime);
    const [endTime, setEndTime] = useState(markData.endTime);

    const onSubmit = async(e) => {
        const data = {name, startTime, endTime, address}
        e.preventDefault();
        const isValid = validateMark(data);
        if(isValid.valid){
            dispatch(editMark({tripId,day,mark:{mark:'outMeal', data, markId:markData.id}}));
            dispatch(getCurrentTrip(tripId));
            navigate(`/trip/${tripId}/schedule`);
        }else{
            toast.error(isValid.message);
        }
    }

    const killMark = () => {
        dispatch(deleteMark({tripId,day,markId:markData.id}));
        dispatch(getCurrentTrip(tripId));
        navigate(`/trip/${tripId}/schedule`);
    }

    return(
        <div>
            <form className="mark-form" id='EditOutMeal' onSubmit={(e)=>{onSubmit(e)}}>
                <h3>{currentTripLength[0]}</h3>
                <div className="mark-container">
                    <input className="mark-input" type="text" placeholder="Name" defaultValue={markData.name} onChange={(e)=>{setName(e.target.value)}}/>
                    <span className="time-label"></span>
                    <input className="mark-input" type="text" placeholder="Address" defaultValue={markData.address} onChange={(e)=>{setAddress(e.target.value)}}/>
                </div>
                <div className="mark-container">
                    <input className="mark-input" type="time" name="" id="" defaultValue={markData.startTime} onChange={(e)=>{setStartTime(e.target.value)}}/>
                    <span className="time-label">to</span>
                    <input className="mark-input" type="time" name="" id="" defaultValue={markData.endTime} onChange={(e)=>{setEndTime(e.target.value)}}/>
                </div>
                <button className="mark-success" type="submit">Save</button>
            </form>
            <button className="mark-delete" onClick={()=>{killMark()}}><i className="fa-solid fa-trash fa-lg"></i></button>
        </div>
    )
}

export default EditOutMealForm;
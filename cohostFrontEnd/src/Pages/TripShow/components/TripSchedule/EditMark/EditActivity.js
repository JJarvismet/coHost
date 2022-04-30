import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import '../TripSchedule.css'
import { getCurrentTrip, editMark, deleteMark } from '../../../../../features/trip/tripSlice';
import validateMark from '../validateMark';
import { toast } from 'react-toastify';



const EditActivityForm = (props) =>{
    const {markData} = props;
    const {currentTrip,currentTripLength} = useSelector((state)=>state.trip);
    const {user} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const day = useParams().day;
    const tripId = currentTrip._id;

    const [name, setName] = useState(markData.name);
    const [address, setAddress] = useState(markData.address);
    const [startTime, setStartTime] = useState(markData.startTime);
    const [endTime, setEndTime] = useState(markData.endTime);
    const [description, setDescription] = useState(markData.description);

    const onSubmit = async(e) => {
        const data = {name, startTime, endTime, description, address}
        e.preventDefault();
        const isValid = validateMark(data);
        if(isValid.valid){
            dispatch(editMark({tripId,day,mark:{mark:'activity', data, markId:markData.id}}));
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
            <form className="mark-form" id='EditActivity' onSubmit={(e)=>{onSubmit(e)}}>
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
                <textarea className="mark-input" name="activity-description" id="activity-description" cols="30" rows="10" placeholder="Description" defaultValue={markData.description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                <button className="mark-success" type="submit">Save</button>
            </form>
            <button className="mark-delete" onClick={()=>{killMark()}}><i className="fa-solid fa-trash fa-lg"></i></button>
        </div>
    )
}

export default EditActivityForm;
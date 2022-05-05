import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './TripGuests.css';
import { setGuests, departTrip } from '../../../../features/trip/tripSlice';
import {toast} from 'react-toastify';


const TripGuests = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const {isHost, isAttending, currentTrip, currentGuests} = useSelector((state)=>state.trip);
    const [code, setCode] = useState()
    const [attendance, setAttendance] = useState(isAttending);
    const trip = currentTrip;

    useEffect(()=>{
        if(isMounted.current){
            if(!isHost){
                dispatch(setGuests({tripId:currentTrip._id,attendance:attendance}));
            }
        }else{
            isMounted.current = true;
        }
    },[attendance]);

    const getInviteCode = async() => {
        const response = await axios.get(`/api/trip/invite/${currentTrip._id}`);
        setCode(response.data);
        navigator.clipboard.writeText(`${window.location.origin}/${trip._id}/${response.data}`);
        toast.success('Invite link copied to clipboard');
    }

    const leaveTrip = () => {
        dispatch(departTrip(trip._id));
        navigate('/');
    }

    return(
        <div className='TripGuests'>
            <div className="invite-box">
                {!code &&
                    <button onClick={()=>{getInviteCode()}}>Get invite link</button>
                }
                {code &&
                    <input type="text" disabled value={`${window.location.origin}/${trip._id}/${code}`}/>
                }
            </div>
            <div className="guest-box">
                <div className="rsvp">
                    <form>
                        <div className="form-radio">
                            <input disabled={isHost} checked={isAttending==='yes'} type="radio" name="rsvp" value="yes" id="yes" onChange={()=>{setAttendance('yes')}}/>
                            <label htmlFor="yes">I <span className="yes">will</span> be attending this trip</label>
                        </div>
                        <div className="form-radio">
                            <input disabled={isHost} checked={isAttending==='may'} type="radio" name="rsvp" value="may" id="may" onChange={()=>{setAttendance('may')}}/>
                            <label htmlFor="may">I <span className="may">may</span> be attending this trip</label>
                        </div>
                        <div className="form-radio">
                            <input disabled={isHost} checked={isAttending==='no'} type="radio" name="rsvp" value="no" id="no" onChange={()=>{setAttendance('no')}}/>
                            <label htmlFor="no">I <span className="no">won't</span> be attending this trip</label>
                        </div>
                    </form>
                    {isAttending === 'no' &&
                        <button className="depart" onClick={()=>{leaveTrip()}}>Leave trip</button>
                    }
                </div>
                <div className="guest-body">
                    <div className="guest-info">
                        <span className="name">{currentTrip.host.firstName} {currentTrip.host.lastName}</span>
                        <div className={`isAttending yes`}></div>
                    </div>
                    {currentGuests &&
                        currentGuests.map((guestIndex)=>(
                            <div className="guest-info" key={guestIndex.guest._id}>
                                <span className="name">{guestIndex.guest.firstName} {guestIndex.guest.lastName}</span>
                                <div className={`isAttending ${guestIndex.isAttending}`}></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TripGuests;
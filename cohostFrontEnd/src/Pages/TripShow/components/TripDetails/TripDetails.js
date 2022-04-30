import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setBulletin } from '../../../../features/trip/tripSlice'
import './TripDetails.css'

const TripDetails = () =>{
    const navigate = useNavigate();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const {currentTrip,currentBulletin,isHost,currentTripLength} = useSelector((state)=>state.trip);
    const dispatch = useDispatch();
    const [post, setPost] = useState();
    const trip = currentTrip;

    const sendPost = () => {
        if(post && post.length>0){
            dispatch(setBulletin({tripId:currentTrip._id,post:post}));
        }
        setPost('');
        document.querySelector('#bulletin-input').value = '';
    }

    return(
        <div className='TripDetails'>
            {trip &&
            <div className="trip-details row">
                <div className="trip-info col-12 col-xl-8 col-lg-6">
                    <h3>Trip info</h3>
                    <p>{trip && trip.description}</p>
                    <div className="trip-info-section">
                        <span>{trip && trip.address}</span> 
                        <span className="trip-location">{trip && trip.location}</span> 
                    </div>
                    <div className="trip-info-section">
                        <span>{trip && currentTripLength[0]}</span>
                        <span className="to">to</span>
                        <span>{trip && currentTripLength[currentTripLength.length-1]}</span>
                    </div>
                    <div className="trip-info-section">
                        <span>Hosted by</span>
                        <span>{trip.host.firstName+' '+trip.host.lastName}</span>
                    </div>
                    <div className="info-btns">
                        {isHost &&
                            <button onClick={()=>{navigate(`/trip/${trip._id}/details/edit`)}}><i className="fa-solid fa-pen-to-square fa-xl"></i></button>
                        }
                        <button onClick={()=>{navigate(`/trip/${trip._id}/details/grocery`)}}><i className="fa-solid fa-cart-shopping fa-xl"></i></button>
                    </div>
                </div>
                <div className="bulletin col-12 col-xl-4 col-lg-6">
                    <h3>Bulletin</h3>
                    <div className="bulletin-body">
                        {currentBulletin && currentBulletin.map((post)=>(
                            <div className="post" key={post.id}>
                                <h4>{post.poster.firstName} {post.poster.lastName.charAt(0)}:</h4>
                                <p> {post.postMsg}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bulletin-input">
                        <input id='bulletin-input' type="text" onChange={(e)=>{setPost(e.target.value)}}/>
                        <button onClick={() => {sendPost()}}><i className="fa-regular fa-paper-plane fa-xl"></i></button>                   
                    </div>
                </div>
            </div>    
            }
        </div>
    )
}

export default TripDetails;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import './TripSchedule.css';


const TripSchedule = () =>{
    const {currentTrip,currentTripLength} = useSelector((state)=>state.trip);
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newScheduleMark = (day) => {
        navigate(`/trip/${currentTrip._id}/schedule/${day}`);
    }

    return(
        <div className='TripSchedule'>
            {currentTripLength.length>0 && currentTripLength.map((date) => (
                <div className='day' key={currentTripLength.indexOf(date)}>
                    <div className="day-header">
                        <h3>{date}</h3>
                        <button onClick={()=>{newScheduleMark(currentTripLength.indexOf(date))}}><i className="fa-solid fa-plus fa-lg"></i></button>
                    </div>
                    <Accordion flush>
                        {currentTrip.schedule[currentTripLength.indexOf(date)] &&
                            currentTrip.schedule[currentTripLength.indexOf(date)].map(mark => (
                                <div className="Mark" key={mark.id}>
                                    {mark.markType === 'A' &&
                                        <Accordion.Item eventKey={mark.id}>
                                            <Accordion.Header>
                                                <div className="mark-header">
                                                    <i className="fa-solid fa-flag fa-xl"></i>
                                                    <h5>{mark.displayStart}</h5>
                                                    <h5>{mark.name}</h5>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className="accordion-body">
                                                <span>{`${mark.displayStart} - ${mark.displayEnd}`}</span>
                                                <span>{mark.address}</span>
                                                <p>{mark.description}</p>
                                                <span>{`Organized by ${mark.organizer.firstName} ${mark.organizer.lastName}`}</span>
                                                {(user._id === currentTrip.host._id || user._id === mark.organizer._id) &&
                                                    <button onClick={()=>{navigate(`/trip/${currentTrip._id}/schedule/edit/${currentTripLength.indexOf(date)}`, {state:{markType:'A',markData:mark}})}}><i className="fa-solid fa-pen-to-square"></i></button>
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    }
                                    {mark.markType === 'OM' &&
                                        <Accordion.Item eventKey={mark.id}>
                                            <Accordion.Header>
                                                <div className="mark-header">
                                                    <i className="fa-solid fa-utensils fa-xl"></i>
                                                    <h5>{mark.displayStart}</h5>
                                                    <h5>{mark.name}</h5>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className="accordion-body">
                                                <span>{`${mark.displayStart} - ${mark.displayEnd}`}</span>
                                                <span>{mark.address}</span>
                                                <span>{`Organized by ${mark.organizer.firstName} ${mark.organizer.lastName}`}</span>
                                                {(user._id === currentTrip.host._id || user._id === mark.organizer._id) &&
                                                    <button onClick={()=>{navigate(`/trip/${currentTrip._id}/schedule/edit/${currentTripLength.indexOf(date)}`, {state:{markType:'OM',markData:mark}})}}><i className="fa-solid fa-pen-to-square"></i></button>
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    }
                                    {mark.markType === 'IM' &&
                                        <Accordion.Item eventKey={mark.id}>
                                            <Accordion.Header>
                                                <div className="mark-header">
                                                    <i className="fa-solid fa-utensils fa-xl"></i>
                                                    <h5>{mark.displayStart}</h5>
                                                    <h5>{mark.name}</h5>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className="accordion-body">
                                                <span>{`${mark.displayStart} - ${mark.displayEnd}`}</span>
                                                <span>{mark.address}</span>
                                                <span>{`Organized by ${mark.organizer.firstName} ${mark.organizer.lastName}`}</span>
                                                {(user._id === currentTrip.host._id || user._id === mark.organizer._id) &&
                                                    <button onClick={()=>{navigate(`/trip/${currentTrip._id}/schedule/edit/${currentTripLength.indexOf(date)}`, {state:{markType:'IM',markData:mark}})}}><i className="fa-solid fa-pen-to-square"></i></button>
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    }
                                </div>
                            ))
                        }
                    </Accordion>
                </div>
            ))}
        </div>
    )
}

export default TripSchedule;
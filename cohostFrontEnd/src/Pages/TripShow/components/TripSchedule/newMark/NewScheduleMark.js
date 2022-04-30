import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import '../TripSchedule.css'
import NewActivityForm from "./NewActivityForm";
import NewOutMealForm from "./NewOutMealForm";
import NewInMealForm from "./NewInMealForm";


const NewScheduleMark = () =>{
    const {currentTrip} = useSelector((state)=>state.trip);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [place,setPlace] = useState(1);
    const trip = currentTrip;

    return(
        <div className='NewScheduleMark'>
            {place === 1 &&
                <div className="mark-options">
                    <div className="whichNew" onClick={()=>{setPlace(3)}}>
                        <i className="fa-solid fa-utensils fa-xl"></i>
                        <h3>New Meal</h3>
                    </div>
                    <span>or</span>
                    <div className="whichNew" onClick={()=>{setPlace(2)}}>
                        <i className="fa-solid fa-flag fa-xl"></i>
                        <h3>New Activity</h3>
                    </div>
                </div>
            }
            {place === 3 &&
                <div className="mark-options">
                    <div className="whichNew" onClick={()=>{setPlace(4)}}>
                        <i className="fa-solid fa-house fa-xl"></i>
                        <h3>Home Cooked</h3>
                    </div>
                    <span>or</span>
                    <div className="whichNew" onClick={()=>{setPlace(5)}}>
                        <i className="fa-solid fa-store fa-xl"></i>
                        <h3>Going Out</h3>
                    </div>
                </div>
            }
            {place === 2 &&
                <NewActivityForm/>
            }
            {place === 4 &&
                <NewInMealForm/>
            }
            {place === 5 &&
                <NewOutMealForm/>
            }
        </div>
    )
}

export default NewScheduleMark;
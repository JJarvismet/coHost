import React, {useEffect, useState} from 'react';
import './TripBox.css';
import TripCard from '../TripCard/TripCard'
import './TripBoxNav.css';
import Carousel from 'react-elastic-carousel';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 600, itemsToShow: 2, itemsToScroll: 2 },
    { width: 900, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 4 }
];
const TripBox = () =>{
    const {trips} = useSelector((state)=>state.trip);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [time, setTime] = useState(0);

    const onClick = (tripId) => {
        navigate(`/trip/${tripId}/details`);
    }

    useEffect(()=>{
        if(time === 0){
            document.querySelector('#upcoming').classList.add('selected');
            document.querySelector('#past').classList.remove('selected');
        }
        if(time === 1){
            document.querySelector('#past').classList.add('selected');
            document.querySelector('#upcoming').classList.remove('selected');
        }
    },[time])

    const TripBoxNav = () =>{
        return(
            <div className='TripBoxNav'>
                <ul>
                    <li className='tripNavItem selected' id="upcoming" onClick={()=>{setTime(0)}}>Upcoming</li>
                    <li className='tripNavItem' id="past" onClick={()=>{setTime(1)}}>Past</li>
                </ul>
            </div>
        )
    }

    return(
        <div className='TripBox'>
            <TripBoxNav />
            {trips.up && time === 0 &&
                <div className="box-body-wrapper">
                    {trips.up.length>0 &&
                    <>
                        <div className="trip-box-body">
                            <Carousel breakPoints={breakPoints}>
                                {trips.up.map((trip)=>(
                                    <div className='card-wrapper' key={trip._id} onClick={()=>{onClick(trip._id)}}>
                                        <TripCard trip={trip}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="small-trip-box-body">
                            {trips.up.map((trip)=>(
                                <div className='card-wrapper' key={trip._id} onClick={()=>{onClick(trip._id)}}>
                                    <TripCard trip={trip}/>
                                </div>
                            ))}
                        </div>
                    </>
                    }
                    {trips.up.length===0 &&
                    <>
                        <div className="trip-box-body">
                            <span className='box-filler'>No upcoming trips</span>
                        </div>
                        <div className="small-trip-box-body">
                            <span className='box-filler'>No upcoming trips</span>
                        </div>
                    </>
                    }
                </div>
            }
            {trips.past && time === 1 &&
                <div className="box-body-wrapper">
                    {trips.past.length>0 &&
                    <>
                        <div className="trip-box-body">
                            <Carousel breakPoints={breakPoints}>
                                {trips.past.map((trip)=>(
                                    <div className='card-wrapper' key={trip._id} onClick={()=>{onClick(trip._id)}}>
                                        <TripCard trip={trip}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="small-trip-box-body">
                            {trips.past.map((trip)=>(
                                <div className='card-wrapper' key={trip._id} onClick={()=>{onClick(trip._id)}}>
                                    <TripCard trip={trip}/>
                                </div>
                            ))}
                        </div>
                    </>
                    }
                    {trips.past.length===0 &&
                    <>
                        <div className="trip-box-body">
                            <span className='box-filler'>No past trips</span>
                        </div>
                        <div className="small-trip-box-body">
                            <span className='box-filler'>No past trips</span>
                        </div>
                    </>
                    }
                </div>
            }
            {!trips.up && !trips.past &&
            <div className="box-body-wrapper">
                <div className="trip-box-body">
                    <span className='box-filler'>Get Planning!</span>
                </div>
                <div className="small-trip-box-body">
                    <span className='box-filler'>Get Planning!</span>
                </div>
            </div>
            }
        </div>
    )
}

export default TripBox;
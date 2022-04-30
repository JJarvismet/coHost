import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './PlanTrip.css'


const PlanTrip = () =>{
    let navigate = useNavigate();
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    return(
        <div className="PlanTrip">
            <input className="plan-form-item name" type="text" placeholder='Trip Name' onChange={(e)=>{setName(e.target.value)}}/>
            <input className="plan-form-item location" type="text" placeholder='Destination' onChange={(e)=>{setLocation(e.target.value)}}/>
            <button id='lets-go' onClick={()=>{navigate('/plan', {state:{name:name,location:location}})}}>Let's Go!</button>
        </div>
    )
}

export default PlanTrip;
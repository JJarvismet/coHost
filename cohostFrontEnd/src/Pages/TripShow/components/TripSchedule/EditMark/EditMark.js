import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import '../TripSchedule.css'
import EditActivity from "./EditActivity";
import EditInMeal from "./EditInMeal";
import EditOutMeal from "./EditOutMeal";


const EditMark = () =>{
    const {state} = useLocation()
    const {markType, markData} = state;

    return(
        <div className='EditMark'>
            {markType === 'A' &&
                <EditActivity markData={markData}/>
            }
            {markType === 'IM' &&
                <EditInMeal markData={markData}/>
            }
            {markType === 'OM' &&
                <EditOutMeal markData={markData}/>
            }
        </div>
    )
}

export default EditMark;
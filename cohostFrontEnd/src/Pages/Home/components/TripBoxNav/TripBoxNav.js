import React from 'react';
import './TripBoxNav.css';

const TripBoxNav = () =>{

    return(
        <div className='TripBoxNav'>
            <ul>
                <li className='tripNavItem selected' id="upcoming" onClick={()=>{document.querySelector('#upcoming').classList.add('selected'); document.querySelector('#past').classList.remove('selected');}}>Upcoming</li>
                <li className='tripNavItem' id="past" onClick={()=>{document.querySelector('#past').classList.add('selected'); document.querySelector('#upcoming').classList.remove('selected');}}>Past</li>
            </ul>
        </div>
    )
}

export default TripBoxNav;
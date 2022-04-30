import React, {useEffect, useState} from 'react'
import './TripCard.css';
import { useSelector } from 'react-redux';
import Spinner from '../../../../spinner';

function TripCard(props) {
  const trip = props.trip;
  const {isTripLoading} = useSelector((state)=>state.trip);
  const [date,setDate] = useState()
  const [displayGuests, setDisplayGuests] = useState([])

  useEffect(()=>{
    let d = new Date(trip.startDate);
    const off = d.getTimezoneOffset()/60;
    d.setHours(d.getHours()+off);
    const final = d.toDateString().substring(0,10);
    setDate(final);
    let i =1
    let guests = [];
    for(let guest of trip.guests){
      if(i<=3){
        guests.push(`${guest.guest.firstName.charAt(0)}${guest.guest.lastName.charAt(0)}`);
      }
      i++;
    }
    setDisplayGuests(guests);
  },[]);

  if(isTripLoading){
    return(
      <Spinner/>
    )
  }

  return(
    <div className="TripCard">
        <div className="trip-card-img-container">
          <img src={trip.coverImage} alt="Can't find image"/>
          <div className="trip-card-img-overlay"></div>
        </div>
        <div className="trip-card-body">
          <div className="trip-card-header">
            <h3>{trip.name}</h3>
          </div>
          <div className="card-info">
            <div className="info-section">
              <i className="fa-solid fa-location-dot"></i>
              <span>{trip.location}</span>
            </div>
            <div className="info-section">
              <i className="fa-solid fa-calendar-days"></i>
              <span>{date}</span>
            </div>
            <div className="info-section">
              <i className="fa-solid fa-user"></i>
              <span>{trip.host.firstName}</span>
            </div>
            <div className="guest-list">
              {displayGuests && displayGuests.map(guest => (
                <div className="guest">{guest}</div>
              ))}
            </div>
          </div>
        </div>
    </div>

  )
}

export default TripCard;
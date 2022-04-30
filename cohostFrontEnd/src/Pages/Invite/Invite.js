import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset, checkUser } from '../../features/auth/authSlice';
import { killReturn, setReturn } from '../../features/return';
import { toast } from 'react-toastify';
import './Invite.css';

const Invite = () => {
    const { tripId, inviteCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isError,isSuccess,message,isCompError} = useSelector((state)=>state.auth);
    const {returnPoint} = useSelector((state)=>state.return);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isCompError){
            toast.error(message)
            navigate('/login');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    useEffect(() => {
        if(!returnPoint){
            dispatch(setReturn(`/${tripId}/${inviteCode}`));
        }
        const startUp = async() =>{
            await dispatch(checkUser());
        }
        startUp();
    }, [])

    const joinTrip = async() => {
        const response = await axios.post(`/api/trip/invite/${tripId}`, {code:inviteCode});
        if(response){
            dispatch(killReturn());
            navigate(`/trip/${tripId}/details`);
        }
    }

    return(
        <div className="Invite">
            <h1>You've been invited to a trip!</h1>
            <button onClick={()=>{joinTrip()}}>Join Trip</button>
        </div>
    )
}

export default Invite;
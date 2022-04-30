import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset, checkUser } from '../../features/auth/authSlice';
import { myTrips, resetTrips, killTrip, killList } from '../../features/trip/tripSlice';
import { killReturn } from '../../features/return';
import Spinner from '../../spinner';
import './Login.css';

const Login = () =>{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user,isError,isLoading,isSuccess,message,isCompError} = useSelector((state)=>state.auth);
    const {returnPoint} = useSelector((state)=>state.return);

    useEffect(() => {
        if(isError){
            toast.error('Incorrect username or password');
        }
        if(!isCompError && isSuccess && user){
            if(returnPoint){
                navigate(returnPoint);
                dispatch(killReturn);
            }
            if(!returnPoint){
                navigate('/')
            }
        }
        if(isSuccess){
            dispatch(myTrips());
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) =>{
        e.preventDefault()

        const userData = {
            username,
            password
        }

        dispatch(login(userData))
    }

    useEffect(() => {
        dispatch(resetTrips());
        dispatch(killTrip())
        dispatch(killList())
        dispatch(checkUser());
    }, [])
    
    if(isLoading){
        return <Spinner/>
    }
    
    return(
        <div className='Login row'>
            <div className="page-header col-10 col-md-8 col-xl-6" id='fancy-header'>
                <h1>Get planning!</h1>
                <p>Welcome back! login to continue.</p>              
            </div>
            <div className="floating-form col-8 col-md-6 col-lg-4 col-xl-3">
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button>Login <i className="fa-solid fa-arrow-right fa-sm"></i></button>
                </form>
                <p>First time host? Signup <Link to='/register'>here</Link>.</p>
            </div>
        </div>
    )
}

export default Login;
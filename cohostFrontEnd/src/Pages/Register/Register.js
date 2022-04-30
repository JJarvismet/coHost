import React, {useEffect, useState} from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import { killReturn } from '../../features/return';
import Spinner from '../../spinner';

const Register = () =>{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setlastName] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user,isError,isLoading,isSuccess,message} = useSelector((state)=>state.auth);
    const {returnPoint} = useSelector((state)=>state.return);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            if(returnPoint){
                navigate(returnPoint);
                dispatch(killReturn);
            }
            if(!returnPoint){
                navigate('/')
            }
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) =>{
        e.preventDefault()

        if(password !== password2){
            toast.error('passwords do not match')
        }else{
            const userData = {
                username,
                firstName,
                lastName,
                password
            }

            dispatch(register(userData))
        }
    }
    if(isLoading){
        return <Spinner/>
    }

    return(
        <div className='Register'>
            <div className="page-header col-10 col-md-8 col-xl-6" id='fancy-header'>
                <h1>Get planning!</h1>
                <p>Signup to the adventure!</p>              
            </div>
            <div className="floating-form">
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="text" placeholder='First Name' onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <input type="text" placeholder='Last Name' onChange={(e)=>{setlastName(e.target.value)}}/>
                    <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input type="password" placeholder='Confirm Password' onChange={(e)=>{setPassword2(e.target.value)}}/>
                    <button type='submit'>Signup <i className="fa-solid fa-arrow-right fa-sm"></i></button>
                </form>
                <p>Returning host? Login <Link to='/login'>here</Link>.</p>
            </div>
        </div>
    )
}

export default Register;
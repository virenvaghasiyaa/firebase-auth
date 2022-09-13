import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase-config';
import './login.scss';

export default function Login() {

    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                state.email,
                state.password
            );
            setIsLoading(false);
            toast.success('User login successfully!', {
                theme: 'dark'
            });
            console.log(user);
            setRedirect(true);
        } catch (error) {
            setError(error.message);
            toast.error(`${error.message}`, {
                theme: 'colored'
              });
            setIsLoading(false);
        }
    }


    if(redirect){
        return(
            <Navigate to='/home'/>
        )
    }
    return (
        <>
            <div className='py-5 d-flex align-items-center justify-content-center vh-100'>
                <div className='center-container'>
                    <div className='text-center mb-4'>
                        <h1 className='text-center'>Log In</h1>
                        <p className='small text-muted'>Welcome back! Please enter your details</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <label htmlFor="email" className='mb-2'>Email</label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                className='form-control'
                                value={state.email}
                                onChange={handleChange}
                                placeholder='enter your email'
                            />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="password" className='mb-2' >Password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                className='form-control'
                                value={state.password}
                                onChange={handleChange}
                                placeholder='enter your password'
                            />
                            {error ? <p className='small text-danger text-break mb-1'>{error}</p> : ''}
                            <p className='text-end mb-0'><Link to='/forgot-password' className='text-decoration-none fw-semibold'>Reset password?</Link></p>
                        </div>
                        <button type='submit' className='btn btn-dark w-100 mb-4 fw-bold'>{isLoading ? 'Loading...' : 'Log In'}</button>
                        <p className='text-center mb-0'>don't have an account? <Link to='/signup' className='text-decoration-none fw-bold'>signup here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

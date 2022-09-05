import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import './login.scss';

export default function Login() {

    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false)

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
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                state.email,
                state.password
            );
            console.log(user);
            setRedirect(true);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
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
                <div className='login-container'>
                    <h1 className='text-center mb-4'>Log In</h1>
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
                            {error ? <p className='small text-danger text-break'>{error}</p> : ''}
                        </div>
                        <button type='submit' className='btn btn-dark w-100'>Log In</button>
                    </form>
                </div>
            </div>
        </>
    )
}

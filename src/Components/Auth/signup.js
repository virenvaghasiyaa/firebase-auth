import React, { useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Contexts/AuthContext';

export default function Signup() {

  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signup } = useAuth();
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (state.password !== state.confirmPassword) {
      return setError(`Passwords doesn't match! try again!`);
    }

    try {
      setError('');
      await signup(state.email, state.password);
      setIsLoading(false);
      toast.success('User created successfully!', {
        theme: 'dark'
      });
      setRedirect(true);
    } catch (error) {
      toast.error(`${error.message}`, {
        theme: 'colored'
      })
      setError(error.message);
      setIsLoading(false);
    }
  }

  if (redirect) {
    return (
      <Navigate to='/' />
    )
  }
  return (
    <>
      <div className='py-5 d-flex align-items-center justify-content-center vh-100'>
        <div className='center-container'>
          <h1 className='text-center mb-4'>Sign Up</h1>
          <form onSubmit={handleSignUp}>
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
            <div className='mb-3'>
              <label htmlFor="password" className='mb-2'>Password</label>
              <input
                type="password"
                id='password'
                name='password'
                className='form-control'
                value={state.password}
                onChange={handleChange}
                placeholder='enter your password'
              />
            </div>
            <div className='mb-5'>
              <label htmlFor="confirmPassword" className='mb-2'>Confirm password</label>
              <input
                type="password"
                id='confirmPassword'
                name='confirmPassword'
                className='form-control'
                value={state.confirmPassword}
                onChange={handleChange}
                placeholder='enter your confirm password' 
              />
              {error ? <p className='small text-danger text-break'>{error}</p> : ''}
            </div>
            <button type='submit' className='btn btn-dark w-100 mb-4 fw-bold'>{isLoading ? 'Loading...' : 'Sign up'}</button>
            <p className='mb-0 text-center'>already have an account? <Link to='/' className='text-decoration-none fw-bold'>Login</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

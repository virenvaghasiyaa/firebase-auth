import React, {useState} from 'react';
import './home.scss';
import {useAuth} from '../../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const {logout} = useAuth();
  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    try{
      await logout();
      setRedirect(true);
    }catch(error){
      console.log(error.message);
    }
  }

  if(redirect){
    return(
      <Navigate to='/'/>
    )
  }
  return (
    <>
      <div className='img-banner vh-100'>Home
        <button className='btn btn-info' onClick={handleLogout}>logout</button>
      </div>
    </>
  )
}
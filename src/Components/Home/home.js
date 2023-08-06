import React, { useState } from "react";
import "./home.scss";
import { useAuth } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Home() {
  const { logout, currentUser } = useAuth();
  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('user logout successfully!', {
        theme: 'dark'
      })
      setRedirect(true);
    }catch(error){
      toast.error(`${error.message}`, {
        theme: 'light'
      });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="img-banner vh-100">
        {currentUser && currentUser.email}
        <button className="btn btn-info" onClick={handleLogout}>
          logout
        </button>
      </div>
    </>
  );
}

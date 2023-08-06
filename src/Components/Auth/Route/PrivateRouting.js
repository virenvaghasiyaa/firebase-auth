import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

export default function PrivateRouting({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
}

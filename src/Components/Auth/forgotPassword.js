import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { toast } from 'react-toastify';

function ForgotPassword(props) {
  const [state, setState] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError("");
      await resetPassword(state.email);
      setIsLoading(false);
      toast.success("reset requested! please check your email!", {
        theme: "dark",
      });
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      toast.error(`${error.message}`, {
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="center-container">
          <div className="mb-4">
            <h1 className="text-center">Forgot password?</h1>
            <p>No worries, we'll send you reset instructions.</p>
          </div>

          <form onSubmit={handleResetPassword} className="mb-3">
            <div className="mb-4">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={state.email}
                onChange={handleChange}
                placeholder="enter your email"
              />
              {error ? <p className="text-danger small">{error}</p> : ""}
            </div>
            <button type="submit" className="btn btn-dark w-100 fw-bold">
              {isLoading ? "Loading..." : "Reset password"}
            </button>
          </form>
          <div className="text-center">
            <Link to="/" className="text-decoration-none fw-bold">
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;

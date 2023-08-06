import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/login';
import PrivateRouting from './Components/Auth/Route/PrivateRouting';
import Signup from './Components/Auth/signup';
import Home from './Components/Home/home';
import { AuthProvider } from './Contexts/AuthContext';
import ForgotPassword from "./Components/Auth/forgotPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <AuthProvider>
        <Routes>

          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />

          <Route path='/home'
            element={
              <PrivateRouting>
                <Home />
              </PrivateRouting>}
          />

          <Route path='forgot-password' element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

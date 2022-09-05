import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/login';
import PrivateRouting from './Components/Auth/Route/PrivateRouting';
import Signup from './Components/Auth/signup';
import Home from './Components/Home/home';
import { AuthProvider } from './Contexts/AuthContext';

function App() {
  return (
    <>
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

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

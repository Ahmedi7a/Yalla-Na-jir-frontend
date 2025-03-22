import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
// ==========================
import * as authService from '../src/services/authService'; // import the authservice
import * as carService from  '../src/services/carService';
import * as approvalService from  '../src/services/approvalService';
import * as rentalService from  '../src/services/rentalService';
// =============================
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DealerDashboard from './components/Dashboard/DealerDashboard';
// =============================
// user


// ==================================
// dealer


// ===================================
//admin


//====================================
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await carService.index();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    if (user) fetchCars();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };


  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />

      <Routes>
        {!user && (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </>
        )}

        
        {user && user.role === 'admin' && (
          <>
            <Route path="/" element={<AdminDashboard user={user} cars={cars} />} />
            
          </>
        )}

        {user && user.role === 'dealer' && (
          <>
            <Route path="/" element={<DealerDashboard user={user} cars={cars} />} />
           
          </>
        )}
        {/* ahmed */}
        {user && user.role === 'user' && (
          <>
            <Route path="/" element={<UserDashboard user={user} cars={cars} />} />
          </>
        )}

      </Routes>
    </AuthedUserContext.Provider>
  )
}
export default App;

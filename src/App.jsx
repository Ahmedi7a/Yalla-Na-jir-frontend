import { useState, createContext } from 'react';
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

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

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
            <Route path="/" element={<AdminDashboard user={user} />} />
            
          </>
        )}

        {user && user.role === 'dealer' && (
          <>
            <Route path="/" element={<DealerDashboard user={user} />} />
           
          </>
        )}

        {user && user.role === 'user' && (
          <>
            <Route path="/" element={<UserDashboard user={user} />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthedUserContext.Provider>
  )
}
export default App;

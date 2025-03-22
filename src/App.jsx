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
import CarCreate from './components/Dealer/CarCreate';
import CarDetails from './components/Dealer/CarDetails';
import DealerCarsList from './components/Dealer/DealerCarsList';
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



  const handleAddCar = async (formData) => {
    const newCar = await carService.create(formData)
    // Update local state with newly created car
    setCars([...cars, newCar])
  }

  const handleUpdateCar = async (carId, formData) => {
    const updatedCar = await carService.update(carId, formData)
    // Replace old car in state with updatedCar
    const updatedCars = cars.map((c) => (c._id === carId ? updatedCar : c))
    setCars(updatedCars)
  }



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
          
            <Route path ="/dealer/cars/rentals" element={<DealerCarsList user={user} cars={cars} />} />

            <Route path="/dealer/cars/new" element={<CarCreate handleAddCar={handleAddCar} />}/>
       
            <Route path="/dealer/cars/:carId/edit" element={<CarCreate handleUpdateCar={handleUpdateCar} />}/>
            
            <Route path="/dealer/cars/:carId" element={<CarDetails />} />

       
      
        
      
           
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

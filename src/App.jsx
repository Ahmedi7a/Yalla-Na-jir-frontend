import { useState, createContext, useEffect } from 'react';
import { Routes, Route ,useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import About from './components/About/About';
// ==========================
import * as authService from '../src/services/authService'; // import the authservice
import * as carService from  '../src/services/carService';
import * as approvalService from  '../src/services/approvalService';
import * as rentalService from  '../src/services/rentalService';
import Footer from './components/Footer/Footer';
// =============================
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DealerDashboard from './components/Dashboard/DealerDashboard';
// =============================
// user
import CarList from './components/User/CarsList';
import CarDetails from './components/User/CarDetails';
import MyRentals from './components/User/MyRentals';
import DealerRequest from './components/User/DealerRequest';

// ==================================
// dealer
import CarCreate from './components/Dealer/CarCreate';
import CarDealerDetails from './components/Dealer/CarDealerDetails';
import DealerCarsList from './components/Dealer/DealerCarsList';
import RentRequest from './components/Dealer/RentRequest';
// ===================================
//admin
import RentalList from './components/Admin/RentalList';
import DealerCarList from './components/Admin/DealerCarList';



//====================================
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [cars, setCars] = useState([]);
  const nav=useNavigate();


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
    nav('/');
  };



  const handleAddCar = async (formData) => {
    const newCar = await carService.create(formData)
    // Update local state with newly created car
    setCars([...cars, newCar])
    nav('/dealer/cars/rentals');
  }

  const handleUpdateCar = async (carId, formData) => {
    const updatedCar = await carService.update(carId, formData)
    // Replace old car in state with updatedCar
    const updatedCars = cars.map((c) => (c._id === carId ? updatedCar : c))
    setCars(updatedCars)
    nav('/dealer/cars/rentals')

  }

  const handleDeleteCar = async (carId) => {
    try {
      const deleteCar=await carService.deleteCar(carId)
      setCars(cars.filter((car) => car._id !== deleteCar._id))
      nav('/dealer/cars/rentals')
    } catch (error) {
      console.error('Error deleting car:', error)
    }
  }



  return (
    <AuthedUserContext.Provider value={user}>
      <div className="d-flex flex-column min-vh-100">
        <NavBar user={user} handleSignout={handleSignout} />
  
        <main className="flex-grow-1">
          <Routes>
            <Route path="/about" element={<About />} />
            
            {!user && (
              <>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<SignupForm setUser={setUser} />} />
                <Route path="/signin" element={<SigninForm setUser={setUser} />} />
              </>
            )}
  
            {user && user.role === "admin" && (
              <>
                <Route path="/" element={<AdminDashboard user={user} cars={cars} />} />
                <Route path="/admin/rentals" element={<RentalList />} />
                <Route path="/admin/cars" element={<DealerCarList />} />

              </>
            )}
  
            {user && user.role === "dealer" && (
              <>
                <Route path="/" element={<DealerCarsList user={user} cars={cars} />} />
                <Route path="/dealer/cars/rentals" element={<DealerCarsList user={user} cars={cars} />} />
                <Route path="/dealer/cars/new" element={<CarCreate handleAddCar={handleAddCar} />} />
                <Route path="/dealer/cars/:carId/edit" element={<CarCreate handleUpdateCar={handleUpdateCar} />} />
                <Route path="/dealer/cars/:carId" element={<CarDealerDetails handleDeleteCar={handleDeleteCar} />} />
                <Route path="/dealer/requests" element={<RentRequest />} />
              </>
            )}
  
            {user && user.role === "user" && (
              <>
                <Route path="/" element={<UserDashboard user={user} cars={cars} />} />
                <Route path="/cars" element={<CarList cars={cars} />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/my-rentals" element={<MyRentals />} />
                <Route path="/become-dealer" element={<DealerRequest />} />
              </>
            )}
          </Routes>
        </main>
  
        <Footer />
      </div>
    </AuthedUserContext.Provider>
  );
  
}
export default App;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as carService from '../../services/carService';
import * as rentalService from '../../services/rentalService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [rentalData, setRentalData] = useState({ startDate: '', endDate: '' });
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await carService.show(carId);
        setCar(data);
      } catch (err) {
        console.error('Error loading car details:', err);
      }
    };

    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (rentalData.startDate && rentalData.endDate && car) {
      const start = new Date(rentalData.startDate);
      const end = new Date(rentalData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      if (days > 0) {
        setTotalPrice(days * car.pricePerDay);
      } else {
        setTotalPrice(null);
      }
    } else {
      setTotalPrice(null);
    }
  }, [rentalData, car]);

  const handleChange = (e) => {
    setRentalData({ ...rentalData, [e.target.name]: e.target.value });
  };

  const handleRent = async (e) => {
    e.preventDefault();
  
    if (car.availability !== 'available') {
      toast.error('This car is not available for rental.');
      return;
    }
  
    try {
      await rentalService.createRentalRequest(carId, rentalData);
      toast.success('Rental request submitted successfully!');
      
      setRentalData({ startDate: '', endDate: '' });
      setTotalPrice(null);  

      //to refresh
      const updatedCar = await carService.show(carId);
      setCar(updatedCar);
  
    } catch (err) {
      console.error(err);
      toast.error('Error submitting rental request.');
    }
  };
  

  const today = new Date().toISOString().split('T')[0];

  if (!car) return <p>Loading car details...</p>;

  return (
    <div>
      <h2>{car.brand} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Location: {car.location}</p>
      <p>Price per day: ${car.pricePerDay}</p>
      <p>Status: {car.availability}</p>

      <form onSubmit={handleRent}>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={rentalData.startDate}
            onChange={handleChange}
            min={today}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={rentalData.endDate}
            onChange={handleChange}
            min={rentalData.startDate || today}
            required
          />
        </div>

        {totalPrice !== null && (
          <p>Total Price: ${totalPrice}</p>
        )}

        <button type="submit">Rent Car</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CarDetails;

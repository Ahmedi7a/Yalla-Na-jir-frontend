import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import * as carService from '../../services/carService';
import * as rentalService from '../../services/rentalService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewForm from './ReviewForm';
import { AuthedUserContext } from '../../App';
import { useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';


const CarDetails = () => {
  const GAPI = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [rentalData, setRentalData] = useState({ startDate: '', endDate: '' });
  const [totalPrice, setTotalPrice] = useState(null);




  const user = useContext(AuthedUserContext);

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


      const updatedCar = await carService.show(carId);
      setCar(updatedCar);

    } catch (err) {
      console.error(err);
      toast.error('Error submitting rental request.');
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      const updatedCar = await carService.createReview(carId, {
        comment: reviewData.comment,
        rating: reviewData.rating,
      });

      if (!updatedCar || updatedCar.error) {
        throw new Error('Failed to post review');
      }

      setCar(updatedCar);
    } catch (err) {
      console.error('Error adding review:', err);
      toast.error('Failed to submit review');
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GAPI,
  });
  
  if (!isLoaded) return <div>Loading map...</div>;



  const today = new Date().toISOString().split('T')[0];

  if (!car) return <p>Loading car details...</p>;
  

  

  return (
    <div>
<h2>{car.brand} {car.model}</h2>

{car.image?.url ? (
                    <img
                      src={car.image.url}
                      className="card-img-top img-fluid"
                      style={{ height: '225px', objectFit: 'cover' }}
                      alt={`${car.brand} ${car.model}`}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"
                      style={{ height: '225px' }}
                    >
                      No Image Available
                    </div>
                  )}



      <p>Year: {car.year}</p>

      {(() => {
  let lat = 26.2235;
  let lng = 50.5876;

  if (car?.location) {
    const coords = car.location.split(',').map(c => parseFloat(c.trim()));
    if (!isNaN(coords[0]) && !isNaN(coords[1])) {
      lat = coords[0];
      lng = coords[1];
    }
  }

  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div style={{ height: '300px', margin: '20px 0' }}>
      <h4>Car Location:</h4>
      <iframe
        title="Car Location"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
})()}


<br />
<br />
<br />
<br />


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
      <ReviewForm handleAddReview={handleAddReview} />
      {car.reviews && car.reviews.length > 0 && (
        <div>
          <h3>Reviews</h3>
          <ul>
            {car.reviews.map((review) => (
              <li key={review._id}>
                <p><strong>{review.userId.username || 'Anonymous'}</strong> - {new Date(review.createdAt).toLocaleDateString()}</p>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p>{review.comment}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>

      )}


      <ToastContainer />
    </div>
  );
};

export default CarDetails;

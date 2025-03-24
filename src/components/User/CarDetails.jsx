import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import * as carService from '../../services/carService';
import * as rentalService from '../../services/rentalService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewForm from './ReviewForm';
import { AuthedUserContext } from '../../App';

const CarDetails = () => {
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
      setTotalPrice(days > 0 ? days * car.pricePerDay : null);
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

      // Refresh car info
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
      const updatedCar2 = await carService.show(carId);
      setCar(updatedCar2);
    } catch (err) {
      console.error('Error adding review:', err);
      toast.error('Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await carService.deleteReview(carId, reviewId);
      toast.success('Review deleted successfully.');
  
      const updatedCar2 = await carService.show(carId);
      setCar(updatedCar2);
    } catch (err) {
      console.error('Error deleting review:', err);
      toast.error('Failed to delete review.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!car) return <p>Loading car details...</p>;

  return (
    <div>
      {car.image?.url && (
        <img
          src={car.image.url}
          alt={`${car.brand} ${car.model}`}
          style={{
            width: '300px',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
      )}

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

        {totalPrice !== null && <p>Total Price: ${totalPrice}</p>}

        <button type="submit">Rent Car</button>
      </form>

      <hr />

      <ReviewForm handleAddReview={handleAddReview} />

      {car.reviews.map((review) => (
  <li key={review._id}>
    <p>
      <strong>{review.userId?.username || 'Anonymous'}</strong> -{' '}
      {review.createdAt
        ? new Date(review.createdAt).toLocaleDateString()
        : 'just now'}
    </p>
    <p><strong>Rating:</strong> {review.rating}/5</p>
    <p>{review.comment}</p>


    {(user && (user._id === review.userId?._id || user.role === 'admin')) && (
      <button onClick={() => handleDeleteReview(review._id)}>
        Delete Review
      </button>
    )}

    <hr />
  </li>
))}

      <ToastContainer />
    </div>
  );
};

export default CarDetails;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as carService from '../../services/carService';
import { motion } from 'framer-motion';

const CarDealerDetails = ({ handleDeleteCar }) => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const data = await carService.show(carId);
      setCar(data);
    };
    fetchCar();
  }, [carId]);

  if (!car) return (
    <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  

  return (
    <motion.div
      className="container my-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="card shadow p-4 rounded-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="row g-4 align-items-center">
          <div className="col-md-5">
            {car.image?.url ? (
              <img
                src={car.image.url}
                alt={`${car.brand} ${car.model}`}
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-4"
                style={{ height: '300px' }}
              >
                No Image Available
              </div>
            )}
          </div>

          <div className="col-md-7">
            <h2 className="fw-bold">{car.brand} {car.model}</h2>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price per day:</strong> BHD {car.pricePerDay}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`fw-semibold ${
    car.availability === 'available'
      ? 'text-success'
      : car.availability === 'unavailable'
      ? 'text-danger'
      : car.availability === 'rented'
      ? 'text-secondary'
      : 'text-muted'
  }`}>
                {car.availability}
              </span>
            </p>

            <div className="d-flex gap-3 flex-wrap mt-4">
              <Link to={`/dealer/cars/${car._id}/edit`} className="btn btn-outline-primary rounded-pill px-4">
                Edit
              </Link>
              <button
                className="btn btn-outline-danger rounded-pill px-4"
                onClick={() => handleDeleteCar(carId)}
              >
                Delete
              </button>
              <Link to="/dealer/cars/rentals" className="btn btn-outline-secondary rounded-pill px-4">
                Back to Cars
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarDealerDetails;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as carService from '../../services/carService';
import { motion } from 'framer-motion';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [sorting, setSorting] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await carService.index();
        setCars(allCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
    const interval = setInterval(fetchCars, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredCars = cars.filter((car) => {
    const toLower = search.toLowerCase();
    return (
      car.brand.toLowerCase().includes(toLower) ||
      car.model.toLowerCase().includes(toLower)
    );
  });

  const sortedCars = [...filteredCars];
  if (sorting === 'lowToHigh') {
    sortedCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sorting === 'highToLow') {
    sortedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  return (
    <div>
      <div className="container">
        <div className="row py-lg-5 justify-content-center text-center">
          <div className="col-lg-8 col-md-10">
            <h1 className="fw-bold">Find Your Perfect Ride</h1>
            <p className="lead text-body-secondary">
              Explore a wide selection of high-quality cars available for rent. Whether you're planning a road trip or need a temporary ride, we've got a vehicle to fit your style and budget.
            </p>

            <div className="d-flex justify-content-center gap-3 mt-2 mb-3 flex-wrap">
              <Link to="/my-rentals" className="btn btn-warning px-4 py-2 rounded-pill shadow-sm">
                Your Rentals
              </Link>
              <a href="mailto:ga.rent.project@gmail.com" className="btn btn-outline-secondary px-4 py-2 rounded-pill shadow-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <input
            type="text"
            className="form-control shadow-sm rounded-pill px-4 py-2"
            style={{ maxWidth: '400px' }}
            placeholder="🔍 Search for car brand or model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select shadow-sm rounded-pill px-4 py-2"
            style={{ width: '200px' }}
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
          >
            <option value="all">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>

      <div className="container mb-4">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : sortedCars.length === 0 ? (
          <div className="alert alert-warning">No cars match your search.</div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {sortedCars.map((car) => (
              <div className="col" key={car._id}>
                <motion.div
                  className="card h-100 shadow-sm"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
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

                  <motion.div
                    className="card-body d-flex flex-column"
                    variants={{
                      hover: { y: -5 },
                      rest: { y: 0 }
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <h5 className="card-title">
                      <strong>{car.brand} {car.model}</strong>
                    </h5>

                    <p className="card-text mb-2">
                      BHD<strong> {car.pricePerDay} </strong> / Day
                    </p>

                    <small
                      className={`mb-2 ${
                        car.availability === 'available'
                          ? 'text-success'
                          : car.availability === 'unavailable'
                          ? 'text-danger'
                          : car.availability === 'rented'
                          ? 'text-secondary'
                          : 'text-muted'
                      }`}
                    >
                      {car.availability}
                    </small>

                    <motion.div
                      className="card-text small mb-2"
                      variants={{
                        hover: { opacity: 1, height: "auto" },
                        rest: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <strong>Dealer:</strong> {car.dealerId?.username || 'Unknown'}
                    </motion.div>

                    <motion.div
                      className="d-flex justify-content-end mt-auto"
                      variants={{
                        hover: { opacity: 1, height: "auto" },
                        rest: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to={`/cars/${car._id}`} className="btn btn-sm btn-secondary">
                        View Details
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;

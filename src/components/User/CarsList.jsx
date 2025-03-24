import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as carService from '../../services/carService';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [sorting, setSorting] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await carService.index();
        setCars(allCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
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
            <h1 className="fw-light">Find Your Perfect Ride</h1>
            <p className="lead text-body-secondary">
              Explore a wide selection of high-quality cars available for rent. Whether you're planning a road trip or need a temporary ride, we've got a vehicle to fit your style and budget.
            </p>
            <p>
              <Link to="/my-rentals" className="btn btn-primary my-2">Your Rentals</Link>
              <a href="#contact" className="btn btn-secondary my-2">Contact</a>
            </p>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-3">
          <input
            type="text"
            className="form-control flex-grow-1"
            style={{ maxWidth: '400px' }}
            placeholder="Search for car brand or model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select form-select-sm"
            style={{ width: '200px' }}
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
          >
            <option value="all">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {sortedCars.length === 0 ? (
          <div className="alert alert-warning">No cars match your search.</div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {sortedCars.map((car) => (
              <div className="col" key={car._id}>
                <div className="card h-100 shadow-sm">
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
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{car.brand} {car.model}</h5>
                    <p className="card-text mb-2">
                      <strong>Year:</strong> {car.year}<br />
                      <strong>Dealer:</strong> {car.dealerId?.username || 'Unknown'}<br />
                      <strong>Price per day:</strong> ${car.pricePerDay}<br />
                      <strong>Status:</strong> {car.availability}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Link to={`/cars/${car._id}`} className="btn btn-sm btn-outline-primary">View Details</Link>
                      <small className="text-muted">Updated recently</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;

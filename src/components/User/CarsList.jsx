import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as carService from '../../services/carService';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [sorting, setSorting] = useState('all');

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

    const interval = setInterval(fetchCars, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  
  const sortedCars = [...cars];
  if (sorting === 'lowToHigh') {
    sortedCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sorting === 'highToLow') {
    sortedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  if (!cars || cars.length === 0) {
    return <p>No cars available at the moment.</p>;
  }

  return (
    <div>
      <h2>All Cars</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="sort">Sort by Price: </label>
        <select
          id="sort"
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
        >
          <option value="all">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      <ul>
        {sortedCars.map((car) => (
          <li key={car._id}>
            {car.image?.url && (
              <img
                src={car.image.url}
                alt={`${car.brand} ${car.model}`}
                style={{ width: '200px', height: 'auto', borderRadius: '8px', marginBottom: '10px' }}
              />
            )}
            <h3>{car.brand} {car.model}</h3>
            <h4>Dealer: {car.dealerId?.username || 'Unknown'}</h4>
            <p>Year: {car.year}</p>
            <p>Price per day: ${car.pricePerDay}</p>
            <p>Status: {car.availability}</p>
            <Link to={`/cars/${car._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;

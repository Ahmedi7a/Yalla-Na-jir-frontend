import { Link } from 'react-router-dom';

const CarList = ({ cars }) => {
  if (!cars || cars.length === 0) {
    return <p>No cars available at the moment.</p>;
  }

  return (
    <div>
      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
             {car.images && (
              <img
                src={car.images}
                alt={'car'}
                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
              />
            )}
            <h3>{car.brand} {car.model}</h3>
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

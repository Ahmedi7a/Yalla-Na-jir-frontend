import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as carService from '../../services/carService';

function DealerCarsList() {
  const user = useContext(AuthedUserContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchDealerCars = async () => {
      try {
        const allCars = await carService.index();

        // Corrected filter condition to handle object/string IDs
        const dealerCars = allCars.filter(
          (car) => car.dealerId?._id === user._id || car.dealerId === user._id
        );

        console.log('Fetched dealer cars:', dealerCars); // debug
        setCars(dealerCars);
      } catch (error) {
        console.error('Error fetching dealer cars:', error);
      }
    };

    if (user?.role === 'dealer') {
      fetchDealerCars();
      const interval = setInterval(fetchDealerCars, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <main>
      <h1>Dealer Dashboard for {user?.username}</h1>

      <div>
        <h2>My Cars</h2>
        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          <ul>
            {cars.map((car) => (
              <li key={car._id}>
                {car.image?.url ? (
                  <img
                    src={car.image.url}
                    alt={`${car.brand} ${car.model}`}
                    style={{
                      width: '200px',
                      height: 'auto',
                      borderRadius: '8px',
                      marginBottom: '10px',
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <h3>{car.brand} {car.model}</h3>
                <p>Price per day: ${car.pricePerDay}</p>
                <p>Status: {car.availability}</p>
                <Link to={`/dealer/cars/${car._id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default DealerCarsList;

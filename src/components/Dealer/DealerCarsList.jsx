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
        const dealerCars = allCars.filter(
          (car) => car.dealerId?._id === user._id || car.dealerId === user._id
        );
        setCars(dealerCars);
      } catch (error) {
        console.error('Error fetching dealer cars:', error);
      }
    };

    if (user?.role === 'dealer') {
      fetchDealerCars();
      const interval = setInterval(fetchDealerCars, 2000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Dealer Vehicles</h1>
        <p className="text-muted fs-5">Welcome, {user?.username}. Manage your listed vehicles below.</p>
      </div>

      <div className="mb-4">
        <h3 className="fw-semibold">My Cars</h3>
      </div>

      {cars.length === 0 ? (
        <div className="alert alert-info">You haven't listed any cars yet.</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {cars.map((car) => (
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
                    <strong>Price per day:</strong> ${car.pricePerDay}<br />
                    <strong>Status:</strong> {car.availability}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Link to={`/dealer/cars/${car._id}`} className="btn btn-sm btn-outline-primary">
                      View Details
                    </Link>
                    <small className="text-muted">Updated recently</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DealerCarsList;

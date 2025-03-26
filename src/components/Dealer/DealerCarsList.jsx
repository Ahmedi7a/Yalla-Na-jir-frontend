import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as carService from '../../services/carService';
import { motion } from 'framer-motion';

function DealerCarsList() {
  const user = useContext(AuthedUserContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
        <h1 className="fw-bold">Your Listed Vehicles</h1>
        <p className="text-muted fs-5">
          Welcome, <strong>{user?.username}</strong>. Below are the cars you've listed for rent.
        </p>
      </div>


      <div className="mb-4">
        <h3 className="fw-semibold">My Cars</h3>
      </div>


      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : cars.length === 0 ? (
        <div className="alert alert-info">You haven't listed any cars yet.</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {cars.map((car) => (
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
                  <h5 className="card-title fw-bold">
                    {car.brand} {car.model}
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
                    className="d-flex justify-content-end mt-auto"
                    variants={{
                      hover: { opacity: 1, height: "auto" },
                      rest: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/dealer/cars/${car._id}`} className="btn btn-sm btn-secondary">
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
  );
}

export default DealerCarsList;

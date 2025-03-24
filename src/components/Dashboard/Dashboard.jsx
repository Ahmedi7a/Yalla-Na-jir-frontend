import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AuthedUserContext } from "../../App";
import * as carService from "../../services/carService";
import './Dashboard.css'
const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await carService.index();
        setCars(allCars);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <><div className="hero-video-wrapper">
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="src/assets/CINEMATIC.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="hero-overlay-content">
      <h1 className="display-4 fw-bold text-white">Find Your Perfect Car</h1>
      <p className="lead text-white">Cars for sale and rent near you</p>
    </div>
  </div>

  
  <main className="container" style={{ marginTop: 100, marginBottom: 50 }}>
  <section className="ftco-section ftco-about py-5">
      <div className="container">
        <div className="row g-0">
          {/* Left Image Column */}
          <div
            className="col-md-6 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: `url('src/assets/react.svg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px',
            }}
          ></div>

          {/* Right Text Column */}
          <div className="col-md-6 bg-dark text-white d-flex align-items-center">
            <div className="p-md-5 px-4 py-5">
              <span className="text-uppercase text-primary fw-semibold">About us</span>
              <h2 className="mb-4 mt-2">Welcome to Carbook</h2>

              <p>
                A small river named Duden flows by their place and supplies it with the necessary regelialia.
                It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
              </p>
              <p>
                On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would
                have been rewritten a thousand times and everything that was left from its origin would be the word
                "and" and the Little Blind Text should turn around and return to its own, safe country.
              </p>
              <a href="/cars" className="btn btn-primary py-2 px-4 mt-2">
                Search Vehicle
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
        {/* <div className="text-center mb-4">
          <h1>Welcome, {user.username} 👋</h1>
          <p className="text-muted">This is your personal dashboard.</p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">📦 My Rentals</h5>
                <p className="card-text text-muted">
                  View or cancel your current rentals.
                </p>
                <Link to="/my-rentals" className="btn btn-outline-primary">
                  Go to Rentals
                </Link>
              </div>
            </div>
          </div>

          {user.role === "user" && (
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">🧑‍💼 Become a Dealer</h5>
                  <p className="card-text text-muted">Apply to list your cars.</p>
                  <Link to="/become-dealer" className="btn btn-outline-success">
                    Request Access
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div> */}

        <div className="text-center mb-4">
          <h3>🚘 Featured Vehicles</h3>
          <p className="text-muted">
            Explore some of the top listed cars available now.
          </p>
        </div>

        {cars.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {cars.map((car, idx) => (
              <SwiperSlide key={car._id || idx}>
                <div className="card h-100 shadow-sm" style={{ height: "400px" }}>
                  <div
                    className="card-img-top"
                    style={{
                      height: "200px",
                      backgroundImage: `url(${car.image?.url || "/placeholder.jpg"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }} />
                  <div
                    className="card-body d-flex flex-column text-center"
                    style={{ minHeight: "160px" }}
                  >
                    <h5 className="card-title">
                      {car.brand} {car.model}
                    </h5>

                    <p
                      className="text-muted mb-1"
                      style={{
                        height: "20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {car.location}
                    </p>

                    <p className="fw-bold">
                      ${car.pricePerDay} <span className="text-muted">/ day</span>
                    </p>

                    <div className="d-flex justify-content-center gap-2 mt-auto">
                      <Link
                        to={`/cars/${car._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-muted">Loading featured vehicles...</p>
        )}
      </main></>
  );
};

export default Dashboard;
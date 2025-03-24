import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AuthedUserContext } from "../../App";
import * as carService from "../../services/carService";
// import './Dashboard.css'
import { motion } from 'framer-motion';




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

  const teamMembers = [
    {
      name: "Sayed Haider",
      role: "Software Developer",
      image: "./img2_copy-removebg-preview.png",
      linkedin: "https://www.linkedin.com/in/sayed-haider-al-hashemi"
    },
    {
      name: "Ahmed Abdulla",
      role: "Software Developer",
      image: "./ahmed-removebg-preview.png",
      linkedin: "https://www.linkedin.com/in/ahmed-abdulla-amralla"
    },
    {
      name: "Mahmood Almajed",
      role: "Software Developer",
      image: "./mahmood-Photoroom-removebg-preview.png",
      linkedin: "https://www.linkedin.com/in/mahmood-almajed"
    },
    {
      name: "Abbas Hussain",
      role: "Software Developer",
      image: "./abbas.png",
      linkedin: "https://www.linkedin.com/in/abbashussainj"
    },
  ];
  
  const brands = [
    {
      name: "Audi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
    },
    {
      name: "BMW",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    },
    {
      name: "Ford",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
    },
    {
      name: "Mercedes Benz",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    },
    {
      name: "Nissan",
      logo: "https://www.gearboxsolutions.com.au/wp-content/uploads/2016/02/Nissan-logo.svg_.png",
    },
    {
      name: "Toyota",
      logo: "https://www.svgrepo.com/show/306868/toyota.svg",
    },
  ];

  return (
    <><motion.div
  className="hero-video-wrapper"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <video
    className="hero-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="./CINEMATIC.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="hero-overlay-content">
    <h1 className="display-4 fw-bold text-white">Find Your Perfect Car</h1>
    <p className="lead text-white">Cars for sale and rent near you</p>
  </div>
</motion.div>


  
  <main className="container" style={{ marginTop: 100, marginBottom: 50 }}>

  <motion.section
  className="py-5"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold">Explore Our Premium Brands</h2>
      <span className="text-primary" style={{ cursor: "pointer" }}>
        <a href="/signin">Show All Brands</a> <span aria-hidden>↗</span>
      </span>
    </div>
    <div className="row g-4">
      {brands.map((brand, idx) => (
        <motion.div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
        >
          <div className="brand-card text-center p-3 shadow-sm bg-white rounded-4 h-100">
            <img
              src={brand.logo}
              alt={brand.name}
              className="brand-logo mb-2"
              style={{ height: 50, objectFit: "contain" }}
            />
            <p className="mb-0 fw-medium">{brand.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>

    <hr />

  <section className="ftco-section ftco-about py-5">
      <div className="container" style={{width:1300}}>
        <div className="row g-0">
          {/* Left Image Column */}
          <div
            className="col-md-6 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: `url('./enhanced-image.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '500px',
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              }}
          ></div>

          {/* Right Text Column */}
          <div className="col-md-6 bg-dark text-white d-flex align-items-center" style={{              
            borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",}}>
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
              <a href="/signin" className="btn btn-primary py-2 px-4 mt-2">
                Search Vehicle
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
   

        <div className="text-center mb-4">
          <h3 style={{marginTop: 50}}>Featured Vehicles</h3>
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
                      BHD {car.pricePerDay} <span className="text-muted">/ day</span>
                    </p>

                    <div className="d-flex justify-content-center gap-2 mt-auto">
                      <Link
                        to={`/signin`}
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

<section className="py-5">
  <div className="container text-center">
    <h1 className="mb-5 fw-bold" style={{marginTop: 50}}>Our Team</h1>
    <div className="row justify-content-center g-4">
    {teamMembers.map((member, index) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card-link">
      <div className="team-card shadow-sm">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-100"
        />
        <div className="team-info">
          <h5>{member.name}</h5>
          <p>{member.role}</p>
          <i className="bi bi-linkedin"></i>
        </div>
      </div>
    </a>
  </div>
))}

    </div>
  </div>
</section>




      </main></>
  );
};

export default Dashboard;
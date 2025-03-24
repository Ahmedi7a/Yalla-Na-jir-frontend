import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthedUserContext } from "../../App";
import "./NavBar.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar fixed-top ${scrolled ? "navbar-dark bg-dark shadow-sm" : "navbar-transparent"}`}
      initial={{ y: 0 }}
      animate={{ y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }}
      style={{ zIndex: 999 }}
    >
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link className="navbar-brand fw-bold" to="/">Yalla Na'jir</Link>
        <ul className="nav gap-3">
          {!user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/rentals">Rental List</Link></li>
              <li className="nav-item"><button onClick={handleSignout} className="btn btn-link nav-link">Sign Out</button></li>
            </>
          )}
          {user?.role === "dealer" && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dealer/cars/rentals">My Cars & Rentals</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dealer/cars/new">Add Car</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dealer/requests">Rental Requests</Link></li>
              <li className="nav-item"><button onClick={handleSignout} className="btn btn-link nav-link">Sign Out</button></li>
            </>
          )}
          {user?.role === "user" && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cars">Cars</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/my-rentals">My Rentals</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/become-dealer">Become a Dealer</Link></li>
              <li className="nav-item"><button onClick={handleSignout} className="btn btn-link nav-link">Sign Out</button></li>
            </>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default NavBar;

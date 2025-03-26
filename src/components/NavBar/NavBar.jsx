import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; 

const NavBar = ({ user, handleSignout }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const navbarHeight = document.getElementById("ftco-navbar").offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ftco_navbar ftco-navbar-light ${
        isCollapsed ? "" : "scrolled awake"
      }`}
      id="ftco-navbar"
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold" to="/">
          Rent<span className="text-warning fw-bold">X</span>press
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          onClick={toggleNavbar}
          aria-controls="ftco-nav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="oi oi-menu"></span> Menu
        </button>

        <div
          className={`navbar-collapse collapse ${!isCollapsed ? "show" : ""} justify-content-center`}
          id="ftco-nav"
        >
          <ul className="navbar-nav">
            {!user && (
              <>

              </>
            )}
            {user?.role === "admin" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/rentals">Rental List</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/cars">Car List</Link></li>
              </>
            )}
            {user?.role === "dealer" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dealer/cars/rentals">My Cars & Rentals</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dealer/cars/new">Add Car</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dealer/requests">Rental Requests</Link></li>
              </>
            )}
            {user?.role === "user" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/cars">Cars</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/my-rentals">My Rentals</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/become-dealer">Become a Dealer</Link></li>
              </>
            )}
          </ul>
        </div>
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          {!user ? (
            <>
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <li className="nav-item"><button onClick={handleSignout} className="btn btn-link nav-link">Sign Out</button></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
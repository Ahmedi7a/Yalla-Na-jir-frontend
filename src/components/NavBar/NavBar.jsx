import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Yalla Na'jir</Link>
      </div>

      <ul className="nav-links">
        {!user && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><button onClick={handleSignout}>Sign Out</button></li>
          </>
        )}

        {user && user.role === "dealer" && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/dealer/cars/rentals">My Cars & Rentals</Link></li>
            <li><Link to="/dealer/cars/new">Add Car</Link></li>
            <li><Link to="/dealer/requests">Rental Requests</Link></li>
            <li><button onClick={handleSignout}>Sign Out</button></li>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/my-rentals">My Rentals</Link></li>
            <li><Link to="/become-dealer">Become a Dealer</Link></li>
            <li><button onClick={handleSignout}>Sign Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

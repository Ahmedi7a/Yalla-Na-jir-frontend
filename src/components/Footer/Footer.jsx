import React from 'react';

const Footer = () => {
  return ( 
    <footer className="bg-dark text-white pt-5 border-top">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-4">
            <h5 className="mb-3 text-warning">About RentXpress</h5>
            <p>
            RentXpress is created by a team of four passionate developers committed to revolutionizing car rentals. 
            We aim to provide a seamless, secure, and user-friendly platform that connects car owners with renters effortlessly. 
            With a focus on convenience, trust, and accessibility, we make finding and listing cars easier than ever. 
            Your perfect ride is just a few clicks away!            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-3 text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Important:</strong>{' '}
                <a href="#" className="text-white text-decoration-underline">Terms &amp; Conditions</a>,{' '}
                <a href="#" className="text-white text-decoration-underline">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <strong>Resources:</strong>{' '}
                <a href="#" className="text-white text-decoration-underline">Expertise</a>,{' '}
                <a href="#" className="text-white text-decoration-underline">Pricing</a>,{' '}
                <a href="#" className="text-white text-decoration-underline">Newsletter</a>
              </li>
              <li>
                <strong>Navigation:</strong>{' '}
                <a href="#" className="text-white text-decoration-underline">Home</a>,{' '}
                <a href="#" className="text-white text-decoration-underline">Details</a>,{' '}
                <a href="#" className="text-white text-decoration-underline">Solutions</a>,{' '}
                <a href="#" className="text-white text-decoration-underline">Projects</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-3 text-warning">Get in Touch</h5>
            <div className="mb-3">
              <a href="#" className="text-white me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-pinterest fa-lg"></i>
              </a>
            </div>
            <p className="mb-0">
              We'd love to hear from you:<br />
              <a href="mailto:ga.rent.project@gmail.com" className="text-white fw-semibold">ga.rent.project@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="text-center pt-4 border-top mt-4 pb-3 text-warning" style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} RentXpress. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

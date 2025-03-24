import React from 'react';

const Footer = () => {
  return ( 
    <footer className="bg-dark text-white pt-5 border-top">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-4">
            <h5 className="mb-3">About Vera</h5>
            <p>
              Vera is a forward-thinking software solutions company committed to delivering custom digital experiences that empower businesses to grow and thrive. Our team specializes in innovative, scalable, and user-centric products tailored to your goals.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Important:</strong>{' '}
                <a href="#" className="text-white text-decoration-underline">Terms &amp; Conditions</a>,{' '}
                <a href="privacy.html" className="text-white text-decoration-underline">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <strong>Resources:</strong>{' '}
                <a href="index.html#expertise" className="text-white text-decoration-underline">Expertise</a>,{' '}
                <a href="index.html#pricing" className="text-white text-decoration-underline">Pricing</a>,{' '}
                <a href="index.html#newsletter" className="text-white text-decoration-underline">Newsletter</a>
              </li>
              <li>
                <strong>Navigation:</strong>{' '}
                <a href="index.html" className="text-white text-decoration-underline">Home</a>,{' '}
                <a href="index.html#details" className="text-white text-decoration-underline">Details</a>,{' '}
                <a href="index.html#solutions" className="text-white text-decoration-underline">Solutions</a>,{' '}
                <a href="index.html#projects" className="text-white text-decoration-underline">Projects</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Get in Touch</h5>
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
              <a href="mailto:contact@site.com" className="text-white fw-semibold">contact@site.com</a>
            </p>
          </div>
        </div>

        <div className="text-center pt-4 border-top mt-4 pb-3" style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Vera Software Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

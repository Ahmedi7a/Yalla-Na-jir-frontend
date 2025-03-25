import { useState } from 'react';
import * as approvalService from '../../services/approvalService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DealerRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequest = async () => {
    if (!/^\d{8}$/.test(formData.phone)) {
      toast.error('Phone number must be exactly 8 digits.');
      return;
    }


    setLoading(true);
    try {
      const response = await approvalService.requestDealer(formData);

      if (response && response.approval) {
        toast.success('Your dealer request has been sent!');
        setSubmitted(true);
      } else if (response?.error) {
        toast.error(response.error);
      } else {
        toast.info('Request submitted. Waiting for admin approval.');
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light" id="dealer-request">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h2 className="fw-bold text-dark mb-3">Become a Dealer with Rent<span className='text-warning'>X</span>press</h2>
            <hr className="mb-4" style={{ width: '60px', border: '2px solid rgb(203, 193, 0)' }} />
            <p className="text-muted fs-5" style={{ textAlign: "justify" }}>
              Join the <strong>Rent<span className='text-warning'>X</span>press </strong>dealer network and grow your business with powerful tools, priority support, and seamless platform integration. We’re here to help you reach more customers and manage your fleet with ease.            </p>
            <ul className="list-unstyled mt-4">
              <li className="d-flex mb-3">
                <i className="fas fa-check-circle text-warning me-3 mt-1"></i>
                <div style={{ textAlign: "justify" }}>
                  <strong>Tailored Solutions:</strong> Get access to a custom dashboard built to simplify your operations and help you scale faster.
                </div>
              </li>
              <li className="d-flex mb-3">
                <i className="fas fa-check-circle text-warning me-3 mt-1"></i>
                <div style={{ textAlign: "justify" }}>
                  <strong>Dedicated Support:</strong> Enjoy dedicated support with faster response times and personalized assistance whenever you need it.
                </div>
              </li>
              <li className="d-flex">
                <i className="fas fa-check-circle text-warning me-3 mt-1"></i>
                <div style={{ textAlign: "justify" }}>
                  <strong>Seamless Integration:</strong> Easily connect your existing systems with our platform — no complex setup required.
                </div>
              </li>
            </ul>
          </div>


          <div className="col-md-6">
            <div className="card bg-dark text-light shadow-lg border-0 rounded-4 p-4">
              {submitted ? (
                <div className="text-center">
                  <h4 className="mb-3">🎉 Request Sent</h4>
                  <p>Your dealer request is pending admin approval.</p>
                </div>
              ) : (<>
                <h4 className="mb-3">Request Dealer Access</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        🇧🇭 +973
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your number"
                        required
                        pattern="\d{8}"
                        maxLength={8}
                      />

                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Why do you want to become a dealer?</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-warning btn-lg"
                      onClick={handleRequest}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Submitting...
                        </>
                      ) : (
                        'Send Request'
                      )}
                    </button>
                  </div>
                </form>
              </>

              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
    </section>
  );
};


export default DealerRequest;

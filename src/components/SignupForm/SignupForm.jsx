import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <section className="min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-10">
            <div className="card shadow border-0 rounded-4 overflow-hidden">
              <div className="row g-0">
                
                <div className="col-lg-5 d-none d-lg-block bg-dark" style={{ height: '100%' }}>
                  <img 
                    src="https://images.pexels.com/photos/3786092/pexels-photo-3786092.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2" 
                    alt="Signup" 
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="col-lg-7 bg-white d-flex align-items-center">
                  <div className="p-4 p-md-5 w-100">
                    <h4 className="mb-4 text-center fw-bold">Create an Account</h4>
                    
                    <p className="text-danger text-center">{message}</p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          value={username}
                          name="username"
                          onChange={handleChange}
                          placeholder="Enter username"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          value={password}
                          name="password"
                          onChange={handleChange}
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          id="confirm"
                          className="form-control"
                          value={passwordConf}
                          name="passwordConf"
                          onChange={handleChange}
                          placeholder="Re-enter password"
                        />
                      </div>

                      <button type="submit" className="btn btn-warning w-100 mb-2" disabled={isFormInvalid()}>
                        Sign Up
                      </button>

                      <Link to="/" className="btn btn-outline-secondary w-100">
                        Cancel
                      </Link>

                      <p className="mt-3 text-center">
                        Already have an account? <Link to="/signin">Log in</Link>
                      </p>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
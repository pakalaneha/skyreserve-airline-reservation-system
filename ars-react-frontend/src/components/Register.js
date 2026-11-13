import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = (e) => {
    e.preventDefault();
    AuthService.register(user)
      .then(() => {
        setMessage("Registration successful. Redirecting to sign in…");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch(() => {
        setMessage("Registration failed. Please check your details.");
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center py-4">
              <h3 className="fw-bold mb-0">Create an Account</h3>
              <p className="mb-0 small opacity-75">Join SkyReserve today</p>
            </div>
            <div className="card-body p-4 p-md-5">
              {message && <div className="alert alert-info border-0 shadow-sm">{message}</div>}

              <form onSubmit={register}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">First Name</label>
                    <input className="form-control" placeholder="John" name="firstName" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Last Name</label>
                    <input className="form-control" placeholder="Doe" name="lastName" onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email Address</label>
                  <input className="form-control" type="email" placeholder="john@example.com" name="email" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <input className="form-control" type="password" placeholder="••••••••" name="password" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Phone Number</label>
                  <input className="form-control" placeholder="+91 9876543210" name="phone" onChange={handleChange} required />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Account Role</label>
                  <select className="form-select" name="role" onChange={handleChange} value={user.role}>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <button className="btn btn-success w-100 py-2 fw-semibold fs-5">Register</button>
              </form>

              <div className="text-center mt-4">
                <small className="text-muted">Already have an account? <Link to="/" className="text-primary text-decoration-none fw-semibold">Sign in</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
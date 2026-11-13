import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Login State
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Register State
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER"
  });

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegChange = (e) => setRegData({ ...regData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const { data } = await AuthService.login(loginData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("firstName", data.firstName || data.email.split("@")[0]);
      localStorage.setItem("lastName", data.lastName || "");
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      navigate(data.role === "ADMIN" ? "/admin" : "/customer");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    AuthService.register(regData)
      .then(() => {
        setMessage("Account created! Please sign in.");
        setIsSignUp(false);
      })
      .catch(() => setMessage("Registration failed. Try again."));
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center p-3">
      <style>{`
        .auth-container {
          background-color: #fff;
          border-radius: 1rem;
          box-shadow: 0 14px 28px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
          width: 850px;
          max-width: 100%;
          height: 600px;
        }
        
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
          box-sizing: border-box;
        }

        /* SIGN IN CONTAINER */
        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .auth-container.right-panel-active .sign-in-container {
          transform: translateX(100%);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* SIGN UP CONTAINER */
        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
          visibility: hidden;
          pointer-events: none;
        }

        .auth-container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          visibility: visible;
          pointer-events: auto;
        }

        /* OVERLAY CONTAINER */
        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }

        .auth-container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: #0d6efd;
          background: linear-gradient(to right, #0d6efd, #0b5ed7);
          color: #FFFFFF;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .auth-container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .overlay-left { transform: translateX(-20%); }
        .auth-container.right-panel-active .overlay-left { transform: translateX(0); }

        .overlay-right { right: 0; transform: translateX(0); }
        .auth-container.right-panel-active .overlay-right { transform: translateX(20%); }
      `}</style>

      <div className="mb-3">
        <Link to="/" className="text-decoration-none fw-bold fs-4 text-primary">✈️ SkyReserve</Link>
      </div>

      <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
        
        {/* SIGN UP FORM */}
        <div className="form-container sign-up-container p-4 p-md-5 d-flex flex-column justify-content-center">
          <form onSubmit={handleRegister} className="w-100">
            <h3 className="fw-bold mb-3 text-center">Create Account</h3>
            {message && <div className="alert alert-info py-2 px-2 small mb-3">{message}</div>}
            
            <div className="row g-2 mb-2">
              <div className="col-6">
                <label className="form-label small fw-semibold mb-1">First Name</label>
                <input className="form-control form-control-sm" placeholder="John" name="firstName" onChange={handleRegChange} required />
              </div>
              <div className="col-6">
                <label className="form-label small fw-semibold mb-1">Last Name</label>
                <input className="form-control form-control-sm" placeholder="Doe" name="lastName" onChange={handleRegChange} required />
              </div>
            </div>
            
            <div className="mb-2">
              <label className="form-label small fw-semibold mb-1">Email</label>
              <input className="form-control form-control-sm" type="email" placeholder="john@example.com" name="email" onChange={handleRegChange} required />
            </div>

            <div className="mb-2">
              <label className="form-label small fw-semibold mb-1">Password</label>
              <input className="form-control form-control-sm" type="password" placeholder="••••••••" name="password" onChange={handleRegChange} required />
            </div>

            <div className="mb-2">
              <label className="form-label small fw-semibold mb-1">Phone</label>
              <input className="form-control form-control-sm" placeholder="+91 9876543210" name="phone" onChange={handleRegChange} required />
            </div>
            
            <div className="mb-3">
              <label className="form-label small fw-semibold mb-1">Role</label>
              <select className="form-select form-select-sm" name="role" onChange={handleRegChange} value={regData.role}>
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            
            <button className="btn btn-primary w-100 py-2 fw-semibold">Register</button>
          </form>
        </div>

        {/* SIGN IN FORM */}
        <div className="form-container sign-in-container p-4 p-md-5 d-flex flex-column justify-content-center">
          <form onSubmit={handleLogin} className="w-100">
            <h3 className="fw-bold mb-3 text-center">Sign In</h3>
            {message && <div className="alert alert-danger py-2 px-2 small mb-3">{message}</div>}
            
            <div className="mb-3">
              <label className="form-label small fw-semibold mb-1">Email Address</label>
              <input required type="email" className="form-control" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="user@example.com" />
            </div>
            
            <div className="mb-4">
              <label className="form-label small fw-semibold mb-1">Password</label>
              <input required type="password" className="form-control" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="••••••••" />
            </div>

            <button disabled={loading} className="btn btn-primary w-100 py-2 fw-semibold">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* SLIDING OVERLAY PANEL */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h3 className="fw-bold mb-2">Welcome Back!</h3>
              <p className="small mb-4">To keep connected with us please sign in with your personal account.</p>
              <button className="btn btn-outline-light rounded-pill px-4 fw-semibold" onClick={() => { setIsSignUp(false); setMessage(""); }}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h3 className="fw-bold mb-2">Hello, Traveler!</h3>
              <p className="small mb-4">Enter your personal details and start your journey with SkyReserve.</p>
              <button className="btn btn-outline-light rounded-pill px-4 fw-semibold" onClick={() => { setIsSignUp(true); setMessage(""); }}>
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
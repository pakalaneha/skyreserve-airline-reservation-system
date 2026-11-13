import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {
  const navigate = useNavigate(); 
  const [login, setLogin] = useState({ email: "", password: "" }); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const loginUser = async (e) => { 
    e.preventDefault(); 
    setMessage(""); 
    setLoading(true); 
    try { 
      const { data } = await AuthService.login(login); 
      localStorage.setItem("token", data.token); 
      localStorage.setItem("userId", data.userId); 
      localStorage.setItem("firstName", data.firstName || data.email.split("@")[0]); 
      localStorage.setItem("lastName", data.lastName || ""); 
      localStorage.setItem("email", data.email); 
      localStorage.setItem("role", data.role); 
      navigate(data.role === "ADMIN" ? "/admin" : "/customer"); 
    } catch (error) { 
      setMessage(error.response?.data?.message || "Invalid email or password."); 
    } finally { 
      setLoading(false); 
    } 
  };

  return (
    <main className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg rounded-4 overflow-hidden w-100 max-w-1000 bg-white m-2" style={{ maxWidth: "900px" }}>
        <section className="col-md-6 bg-primary text-white p-5 d-flex flex-column justify-content-between">
          <div>
            <span className="badge bg-light text-primary mb-3 text-uppercase fw-bold">SkyReserve</span>
            <h1 className="display-6 fw-bold">Travel made simple.</h1>
            <p className="lead opacity-75">Search flights, select your seat, and manage every journey in one place.</p>
          </div>
          <small className="opacity-50">🔒 Secure airline reservations</small>
        </section>

        <section className="col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
          <div className="w-100">
            <Link className="text-decoration-none fw-bold fs-4 text-primary d-block mb-3" to="/">SkyReserve</Link>
            <h2 className="h4 fw-bold">Welcome back</h2>
            <p className="text-muted mb-4 small">Sign in to continue to your account.</p>

            {message && <div className="alert alert-danger border-0 small py-2">{message}</div>}

            <form onSubmit={loginUser}>
              <div className="form-floating mb-3">
                <input required type="email" className="form-control" id="emailInput" name="email" value={login.email} onChange={handleChange} placeholder="you@example.com" />
                <label htmlFor="emailInput">Email address</label>
              </div>

              <div className="form-floating mb-4">
                <input required type="password" className="form-control" id="passwordInput" name="password" value={login.password} onChange={handleChange} placeholder="Enter your password" />
                <label htmlFor="passwordInput">Password</label>
              </div>

              <button disabled={loading} className="btn btn-primary w-100 py-3 fw-semibold">
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Signing in…
                  </>
                ) : "Sign in"}
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0 small">
              New to SkyReserve? <Link to="/register" className="text-primary text-decoration-none fw-semibold">Create an account</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
export default Login;
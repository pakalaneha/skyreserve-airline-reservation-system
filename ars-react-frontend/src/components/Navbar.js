import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const logout = () => { localStorage.clear(); navigate("/"); };
  
  const links = role === "ADMIN"
    ? [["Dashboard", "/admin"], ["Airports", "/admin/airport"], ["Airplanes", "/admin/airplane"], ["Schedule flight", "/admin/flight"], ["Flights", "/admin/flights"], ["Customers", "/admin/customers"], ["Bookings", "/admin/bookings"]]
    : [["Dashboard", "/customer"], ["Flights", "/customer/flights"], ["My bookings", "/customer/bookings"], ["Wallet", "/customer/wallet"]];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to={role === "ADMIN" ? "/admin" : "/customer"}>
          <span>✈️ SkyReserve</span>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            {links.map(([label, path]) => (
              <li className="nav-item" key={path}>
                <Link className="nav-link px-3 rounded-2 fw-medium" to={path}>{label}</Link>
              </li>
            ))}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button className="btn btn-light text-primary fw-semibold btn-sm px-3 rounded-pill shadow-sm" onClick={logout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
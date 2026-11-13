import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function CustomerDashboard() {
  const name = localStorage.getItem("firstName");
  const links = [
    ["Find a flight", "Search routes and book your next journey.", "Browse flights", "/customer/flights"], 
    ["My bookings", "View tickets or cancel an upcoming booking.", "View bookings", "/customer/bookings"], 
    ["My wallet", "Check your balance or add funds for a booking.", "Open wallet", "/customer/wallet"]
  ];

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <section className="bg-primary text-white p-4 p-md-5 rounded-4 mb-4 shadow-sm">
          <span className="badge bg-light text-primary mb-2 text-uppercase fw-bold">Your Travel Space</span>
          <h1 className="display-6 fw-bold">Good to see you, {name || "Traveler"}.</h1>
          <p className="lead mb-0 opacity-75">Plan your trip and keep all your bookings in one convenient place.</p>
        </section>

        <div className="row g-4">
          {links.map(([title, text, action, path]) => (
            <div className="col-md-4" key={path}>
              <article className="card border-0 shadow-sm h-100 rounded-3">
                <div className="card-body p-4 d-flex flex-column">
                  <h2 className="h5 fw-bold">{title}</h2>
                  <p className="text-muted flex-grow-1 small">{text}</p>
                  <Link to={path} className="stretched-link text-primary fw-semibold text-decoration-none mt-2">
                    {action} →
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
export default CustomerDashboard;
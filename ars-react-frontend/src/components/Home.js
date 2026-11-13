import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navigation Header */}
      <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16">
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.313 2.503 1.66 1.245a.5.5 0 0 1 .162.538l-.5 1.5a.5.5 0 0 1-.828.216L8 15.5l-2.124 1.577a.5.5 0 0 1-.828-.216l-.5-1.5a.5.5 0 0 1 .162-.538l1.66-1.245-.313-2.503-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.569.139-1.27.428-1.849Z"/>
            </svg>
            SkyReserve
          </Link>
          <div className="d-flex gap-2">
            <Link to="/auth" className="btn btn-outline-light fw-semibold px-4 rounded-pill">
              Sign In / Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container my-auto py-5">
        <div className="row align-items-center g-5 mb-5">
          <div className="col-lg-6 text-center text-lg-start">
            <span className="badge bg-primary-subtle text-primary fw-bold text-uppercase px-3 py-2 rounded-pill mb-3">
              Official Flight Reservation Portal
            </span>
            <h1 className="display-4 fw-bold text-dark mb-3">
              Book domestic and international flights seamlessly.
            </h1>
            <p className="lead text-muted mb-4">
              Real-time flight status, direct wallet payment integrations, and instant e-ticket issuing tailored for your travel needs.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <Link to="/auth" className="btn btn-primary btn-lg px-4 fw-semibold rounded-pill shadow-sm">
                Get Started
              </Link>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src="https://t4.ftcdn.net/jpg/06/22/48/59/360_F_622485946_nQSx1X5KFF06jHBSomxHo5fCFSIDgE6Q.jpg"
              alt="Commercial aircraft in flight"
              className="img-fluid rounded-4 shadow-lg border"
              style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Feature Highlights with Vector SVG Icons */}
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
              <div className="p-3 bg-primary-subtle text-primary rounded-circle d-inline-flex mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
              <h3 className="h5 fw-bold">Flight Search</h3>
              <p className="text-muted small mb-0">Compare schedule availability across airports with accurate fare options.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
              <div className="p-3 bg-primary-subtle text-primary rounded-circle d-inline-flex mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                  <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                </svg>
              </div>
              <h3 className="h5 fw-bold">Digital Wallet</h3>
              <p className="text-muted small mb-0">Top up account funds for instant automated payment settlement.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
              <div className="p-3 bg-primary-subtle text-primary rounded-circle d-inline-flex mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-ticket-perforated" viewBox="0 0 16 16">
                  <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"/>
                  <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3 .5.5 0 0 0 .5-.5V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V10.95a2.5 2.5 0 0 0 0-4.9V4.5Z"/>
                </svg>
              </div>
              <h3 className="h5 fw-bold">E-Tickets</h3>
              <p className="text-muted small mb-0">Generate and print PDF boarding passes directly from your profile.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3 text-muted border-top bg-white small">
        © SkyReserve Airline Management System
      </footer>
    </div>
  );
}

export default Home;
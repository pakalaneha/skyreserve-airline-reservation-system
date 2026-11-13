import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import AirportService from "../../services/AirportService";
import FlightService from "../../services/FlightService";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";

function FlightList() {
  const [flights, setFlights] = useState([]), [airports, setAirports] = useState([]), [search, setSearch] = useState({ from: "", to: "", date: "" }), [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const available = (items) => setFlights(items.filter(f => f.active && !["CANCELLED", "COMPLETED"].includes(f.flightStatus)));
  const load = () => FlightService.getFlights().then(r => available(r.data)).catch(() => setMessage("Unable to load flights."));

  useEffect(() => { 
    load(); 
    AirportService.getAllAirports().then(r => setAirports(r.data)); 
  }, []);

  const submit = async (e) => { 
    e.preventDefault(); 
    setMessage(""); 
    if (!search.from && !search.to && !search.date) {
      return load();
    }
    if (search.from && search.to && search.from === search.to) {
      return setMessage("Departure and arrival airports must be different.");
    }
    try { 
      const r = await FlightService.searchFlights(search); 
      available(r.data); 
    } catch { 
      setMessage("Unable to search flights."); 
    } 
  };

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <h1 className="h3 fw-bold mb-4">Find a Flight</h1>

        <form className="card card-body shadow-sm border-0 rounded-3 mb-4 p-4" onSubmit={submit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">From</label>
              <select className="form-select" value={search.from} onChange={e => setSearch({ ...search, from: e.target.value })}>
                <option value="">Choose airport</option>
                {airports.map(a => <option key={a.airportId} value={a.airportCode}>{a.airportCode} — {a.airportName}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">To</label>
              <select className="form-select" value={search.to} onChange={e => setSearch({ ...search, to: e.target.value })}>
                <option value="">Choose airport</option>
                {airports.map(a => <option key={a.airportId} value={a.airportCode}>{a.airportCode} — {a.airportName}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-semibold">Departure Date</label>
              <input type="date" className="form-control" value={search.date} onChange={e => setSearch({ ...search, date: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100">Search</button>
            </div>
          </div>
          <p className="small text-muted mt-3 mb-0">
            Choose any combination of departure, destination, and date to narrow the results.
          </p>
          <button type="button" className="btn btn-link align-self-start px-0 mt-2 text-decoration-none small" onClick={() => { setSearch({ from: "", to: "", date: "" }); load(); }}>
            ↺ Show all available flights
          </button>
        </form>

        {message && <div className="alert alert-info border-0 shadow-sm">{message}</div>}

        <div className="row g-3">
          {flights.map(f => (
            <div className="col-lg-6" key={f.flightId}>
              <article className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h2 className="h5 fw-bold mb-0 text-primary">{f.flightNumber}</h2>
                      <span className="badge bg-success">{f.flightStatus.replace("_", " ")}</span>
                    </div>

                    <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded mb-3">
                      <div className="text-center">
                        <span className="fw-bold fs-4">{f.departureAirport?.airportCode}</span>
                      </div>
                      <div className="text-muted">➔</div>
                      <div className="text-center">
                        <span className="fw-bold fs-4">{f.arrivalAirport?.airportCode}</span>
                      </div>
                    </div>

                    <p className="small text-muted mb-2">
                      <strong>Departure:</strong> {formatDate(f.departureTime)}<br />
                      <strong>Arrival:</strong> {formatDate(f.arrivalTime)}
                    </p>
                    <p className="small text-secondary fw-semibold">
                      Economy ₹{f.economyFare} · Business ₹{f.businessFare} · First ₹{f.firstClassFare}
                    </p>
                  </div>
                  
                  <button className="btn btn-primary w-100 mt-3" onClick={() => navigate(`/customer/book/${f.flightId}`)}>
                    Book Flight
                  </button>
                </div>
              </article>
            </div>
          ))}
          {!flights.length && <p className="text-muted col-12 py-4">No available flights match your search.</p>}
        </div>
      </main>
    </>
  );
}
export default FlightList;
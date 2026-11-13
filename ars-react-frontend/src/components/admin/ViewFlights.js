import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import FlightService from "../../services/FlightService";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";
const statuses = ["SCHEDULED", "ON_TIME", "DELAYED", "CANCELLED", "COMPLETED"];

function ViewFlights() {
  const [flights, setFlights] = useState([]); const [message, setMessage] = useState("");

  const load = () => FlightService.getFlights().then(r => setFlights(r.data)).catch(() => setMessage("Unable to load flights."));
  useEffect(() => { load(); }, []);

  const setStatus = async (flight, status) => {
    try { await FlightService.updateFlight(flight.flightId, { ...flight, flightStatus: status }); setMessage("Flight status updated."); load(); } catch { setMessage("Unable to update flight status."); }
  };

  const remove = async (id) => {
    if (window.confirm("Deactivate this flight?")) {
      try { const response = await FlightService.deleteFlight(id); setFlights(current => current.map(f => f.flightId === id ? response.data : f)); setMessage("Flight deactivated."); } catch { setMessage("Unable to deactivate flight."); }
    }
  };

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">Scheduled Flights Operations</h1>
          <button className="btn btn-outline-primary btn-sm" onClick={load}>Refresh Schedules</button>
        </div>

        {message && <div className="alert alert-info border-0 shadow-sm">{message}</div>}

        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">Flight</th>
                    <th>Route</th>
                    <th>Schedule</th>
                    <th>Fares</th>
                    <th>Status</th>
                    <th className="text-end pe-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map(f => (
                    <tr key={f.flightId} className={!f.active ? "bg-light text-muted" : ""}>
                      <td className="ps-3">
                        <div className="fw-bold text-primary">{f.flightNumber}</div>
                        <small className="text-muted">{f.airplane?.airplaneName}</small>
                      </td>
                      <td>
                        <span className="fw-bold">{f.departureAirport?.airportCode}</span>
                        <span className="mx-2 text-muted">➔</span>
                        <span className="fw-bold">{f.arrivalAirport?.airportCode}</span>
                      </td>
                      <td>
                        <small className="d-block"><strong>Dep:</strong> {formatDate(f.departureTime)}</small>
                        <small className="d-block"><strong>Arr:</strong> {formatDate(f.arrivalTime)}</small>
                      </td>
                      <td>
                        <small className="badge bg-light text-dark border">
                          E: ₹{f.economyFare} · B: ₹{f.businessFare} · F: ₹{f.firstClassFare}
                        </small>
                      </td>
                      <td>
                        <select className="form-select form-select-sm" value={f.flightStatus} onChange={e => setStatus(f, e.target.value)}>
                          {statuses.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="text-end pe-3">
                        {f.active ? (
                          <button className="btn btn-sm btn-outline-danger" onClick={() => remove(f.flightId)}>
                            Deactivate
                          </button>
                        ) : (
                          <span className="text-muted small">Inactive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!flights.length && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-5">No flights scheduled yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default ViewFlights;
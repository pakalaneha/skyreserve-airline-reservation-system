import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import AirportService from "../../services/AirportService";
import AirplaneService from "../../services/AirplaneService";
import FlightService from "../../services/FlightService";

const initial = { flightNumber: "", departureAirport: { airportId: "" }, arrivalAirport: { airportId: "" }, airplane: { airplaneId: "" }, departureTime: "", arrivalTime: "", economyFare: "", businessFare: "", firstClassFare: "", flightStatus: "SCHEDULED", active: true };

function AddFlight() {
  const [flight, setFlight] = useState(initial); const [airports, setAirports] = useState([]); const [planes, setPlanes] = useState([]); const [message, setMessage] = useState("");

  useEffect(() => { AirportService.getAllAirports().then(r => setAirports(r.data)).catch(() => setMessage("Unable to load airports.")); AirplaneService.getAllAirplanes().then(r => setPlanes(r.data)).catch(() => setMessage("Unable to load airplanes.")); }, []);
  const change = (e) => setFlight({ ...flight, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault(); setMessage("");
    if (flight.departureAirport.airportId === flight.arrivalAirport.airportId) return setMessage("Departure and arrival airports must be different.");
    if (new Date(flight.arrivalTime) <= new Date(flight.departureTime)) return setMessage("Arrival time must be after departure time.");
    const payload = { ...flight, departureAirport: { airportId: Number(flight.departureAirport.airportId) }, arrivalAirport: { airportId: Number(flight.arrivalAirport.airportId) }, airplane: { airplaneId: Number(flight.airplane.airplaneId) }, economyFare: Number(flight.economyFare), businessFare: Number(flight.businessFare), firstClassFare: Number(flight.firstClassFare) };
    try { await FlightService.addFlight(payload); setMessage("Flight scheduled successfully."); setFlight(initial); } catch (err) { setMessage(err.response?.data?.message || "Unable to schedule this flight."); }
  };

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-primary text-white py-3">
                <h1 className="h4 mb-0">Schedule a Flight</h1>
              </div>
              <div className="card-body p-4">
                {message && <div className="alert alert-info border-0 shadow-sm">{message}</div>}
                <form onSubmit={submit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Flight Number</label>
                      <input required name="flightNumber" value={flight.flightNumber} onChange={change} className="form-control" placeholder="e.g. SK-101" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Assign Airplane</label>
                      <select required value={flight.airplane.airplaneId} onChange={e => setFlight({ ...flight, airplane: { airplaneId: e.target.value } })} className="form-select">
                        <option value="">Select airplane</option>
                        {planes.map(p => <option key={p.airplaneId} value={p.airplaneId}>{p.airplaneName} — {p.registrationNo}</option>)}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Departure Airport</label>
                      <select required value={flight.departureAirport.airportId} onChange={e => setFlight({ ...flight, departureAirport: { airportId: e.target.value } })} className="form-select">
                        <option value="">Select departure airport</option>
                        {airports.map(a => <option key={a.airportId} value={a.airportId}>{a.airportCode} — {a.airportName}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Arrival Airport</label>
                      <select required value={flight.arrivalAirport.airportId} onChange={e => setFlight({ ...flight, arrivalAirport: { airportId: e.target.value } })} className="form-select">
                        <option value="">Select arrival airport</option>
                        {airports.map(a => <option key={a.airportId} value={a.airportId}>{a.airportCode} — {a.airportName}</option>)}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Departure Time</label>
                      <input required type="datetime-local" name="departureTime" value={flight.departureTime} onChange={change} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Arrival Time</label>
                      <input required type="datetime-local" name="arrivalTime" value={flight.arrivalTime} onChange={change} className="form-control" />
                    </div>

                    <div className="col-12"><hr className="my-2" /></div>

                    {[['economyFare','Economy Fare'],['businessFare','Business Fare'],['firstClassFare','First-Class Fare']].map(([name,label]) => (
                      <div className="col-md-4" key={name}>
                        <label className="form-label small fw-semibold">{label} (₹)</label>
                        <input required min="0" type="number" name={name} value={flight[name]} onChange={change} className="form-control" placeholder="0" />
                      </div>
                    ))}

                    <div className="col-12 mt-4">
                      <button className="btn btn-primary btn-lg w-100">Schedule Flight</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default AddFlight;
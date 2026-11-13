import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import BookingService from "../../services/BookingService";
import FlightService from "../../services/FlightService";

const blankPassenger = () => ({ passengerName: "", age: "", gender: "MALE", seatNumber: "" });
const seatCapacity = (flight, type) => ({ ECONOMY: flight?.airplane?.totalEconomySeat, BUSINESS: flight?.airplane?.totalBusinessSeat, FIRST_CLASS: flight?.airplane?.totalFirstClassSeat })[type] || 0;
const createSeats = (count) => Array.from({ length: count }, (_, i) => `${Math.floor(i / 6) + 1}${"ABCDEF"[i % 6]}`);

function Booking() {
  const { id } = useParams(); const navigate = useNavigate(); const userId = localStorage.getItem("userId");
  const [flight, setFlight] = useState(null), [flightClass, setFlightClass] = useState("ECONOMY"), [passengers, setPassengers] = useState([blankPassenger()]), [reservedSeats, setReservedSeats] = useState([]), [message, setMessage] = useState(""), [saving, setSaving] = useState(false);

  useEffect(() => { FlightService.getFlight(id).then(r => setFlight(r.data)).catch(() => setMessage("This flight could not be found.")); }, [id]);
  useEffect(() => { if (flight) FlightService.getReservedSeats(id, flightClass).then(r => { setReservedSeats(r.data); setPassengers(current => current.map(p => ({ ...p, seatNumber: "" }))); }).catch(() => setMessage("Unable to load seat availability.")); }, [id, flight, flightClass]);

  const fare = useMemo(() => !flight ? 0 : ({ ECONOMY: flight.economyFare, BUSINESS: flight.businessFare, FIRST_CLASS: flight.firstClassFare })[flightClass], [flight, flightClass]);
  const seats = useMemo(() => createSeats(seatCapacity(flight, flightClass)), [flight, flightClass]);
  const selectedSeats = passengers.map(p => p.seatNumber).filter(Boolean);

  const updatePassenger = (index, name, value) => setPassengers(passengers.map((item, i) => i === index ? { ...item, [name]: value } : item));
  const selectSeat = (seat) => { if (reservedSeats.includes(seat)) return; const current = selectedSeats.indexOf(seat); if (current >= 0) return updatePassenger(current, "seatNumber", ""); const next = passengers.findIndex(p => !p.seatNumber); if (next >= 0) updatePassenger(next, "seatNumber", seat); else setMessage("Add another passenger before selecting an additional seat."); };

  const book = async (e) => { e.preventDefault(); setMessage(""); if (selectedSeats.length !== passengers.length) return setMessage("Select one seat for each passenger."); setSaving(true); try { const result = await BookingService.createBooking(userId, id, flightClass, passengers.map(p => ({ ...p, age: Number(p.age) }))); navigate("/customer/bookings", { state: { message: `Booking ${result.data.bookingCode} created successfully.` } }); } catch (err) { setMessage(err.response?.data?.message || err.response?.data || "Booking failed. Please check your wallet balance and details."); } finally { setSaving(false); } };

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <div className="row g-4">
          <aside className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-primary text-white py-3">
                <h5 className="card-title mb-0">Flight Summary</h5>
              </div>
              <div className="card-body p-4">
                {flight ? (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary fs-6">{flight.flightNumber}</span>
                      <small className="text-muted">{flight.airplane?.airplaneName}</small>
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded mb-3">
                      <div className="text-center">
                        <div className="fw-bold fs-4">{flight.departureAirport?.airportCode}</div>
                      </div>
                      <div className="text-muted fw-bold">➔</div>
                      <div className="text-center">
                        <div className="fw-bold fs-4">{flight.arrivalAirport?.airportCode}</div>
                      </div>
                    </div>
                    <p className="small text-muted mb-3">
                      <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                    </p>
                    <hr />
                    <h6 className="fw-bold mb-3">Fare Breakdown</h6>
                    <ul className="list-group list-group-flush mb-0 small">
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Economy <span className="fw-semibold">₹{flight.economyFare}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Business <span className="fw-semibold">₹{flight.businessFare}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        First Class <span className="fw-semibold">₹{flight.firstClassFare}</span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <div className="text-center py-4 text-muted">
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Loading flight details…
                  </div>
                )}
              </div>
            </div>
          </aside>

          <section className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Passenger & Seat Details</h2>
                {message && <div className="alert alert-warning border-0 shadow-sm">{message}</div>}

                <form onSubmit={book}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Select Travel Class</label>
                    <select className="form-select form-select-lg" value={flightClass} onChange={e => setFlightClass(e.target.value)}>
                      <option value="ECONOMY">Economy — ₹{flight?.economyFare ?? 0}</option>
                      <option value="BUSINESS">Business — ₹{flight?.businessFare ?? 0}</option>
                      <option value="FIRST_CLASS">First class — ₹{flight?.firstClassFare ?? 0}</option>
                    </select>
                  </div>

                  {passengers.map((p, index) => (
                    <div key={index} className="card bg-light border-0 mb-3 p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-secondary">
                          Passenger {index + 1}
                          {p.seatNumber && <span className="badge bg-success ms-2">Seat {p.seatNumber}</span>}
                        </span>
                        {passengers.length > 1 && (
                          <button type="button" className="btn btn-sm btn-outline-danger border-0" onClick={() => setPassengers(passengers.filter((_, i) => i !== index))}>
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Full Name</label>
                          <input required className="form-control" value={p.passengerName} onChange={e => updatePassenger(index, "passengerName", e.target.value)} placeholder="e.g. John Doe" />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small text-muted">Age</label>
                          <input required min="1" max="120" type="number" className="form-control" value={p.age} onChange={e => updatePassenger(index, "age", e.target.value)} placeholder="Age" />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small text-muted">Gender</label>
                          <select className="form-select" value={p.gender} onChange={e => updatePassenger(index, "gender", e.target.value)}>
                            <option>MALE</option>
                            <option>FEMALE</option>
                            <option>OTHER</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button type="button" className="btn btn-outline-primary btn-sm mb-4" onClick={() => setPassengers([...passengers, blankPassenger()])}>
                    + Add Another Passenger
                  </button>

                  <hr className="my-4" />

                  <h5 className="fw-bold mb-3">Select Seat Map</h5>
                  <div className="d-flex align-items-center gap-3 mb-3 small text-muted">
                    <span><span className="badge bg-light text-dark border">Available</span></span>
                    <span><span className="badge bg-primary">Selected</span></span>
                    <span><span className="badge bg-secondary">Occupied</span></span>
                  </div>

                  <div className="d-flex flex-wrap gap-2 p-3 bg-light rounded mb-4" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {seats.map((seat, index) => (
                      <button
                        type="button"
                        key={seat}
                        className={`btn btn-sm ${reservedSeats.includes(seat) ? "btn-secondary" : selectedSeats.includes(seat) ? "btn-primary" : "btn-outline-secondary"} ${index % 6 === 2 ? "me-3" : ""}`}
                        style={{ width: "45px" }}
                        disabled={reservedSeats.includes(seat)}
                        onClick={() => selectSeat(seat)}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div>
                      <small className="text-muted d-block">Total Payable Amount</small>
                      <span className="fs-3 fw-bold text-primary">₹{(Number(fare) * passengers.length).toFixed(2)}</span>
                    </div>
                    <button disabled={saving || !flight} className="btn btn-primary btn-lg px-4">
                      {saving ? "Confirming…" : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default Booking;
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import BookingService from "../../services/BookingService";
import TicketButton from "../TicketButton";

function ViewBookings() {
  const [bookings, setBookings] = useState([]), [message, setMessage] = useState("");
  const load = () => BookingService.getAllBookings().then(r => setBookings(r.data)).catch(() => setMessage("Unable to load bookings."));
  useEffect(() => { load(); }, []);

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">All Reservations</h1>
          <button className="btn btn-outline-primary btn-sm" onClick={load}>Refresh List</button>
        </div>

        {message && <div className="alert alert-info border-0 shadow-sm">{message}</div>}

        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">Reference</th>
                    <th>Customer</th>
                    <th>Flight</th>
                    <th>Class</th>
                    <th>Passengers</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="text-end pe-3">Ticket</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.bookingId}>
                      <td className="ps-3"><span className="fw-bold text-primary">{b.bookingCode}</span></td>
                      <td>
                        <div className="fw-semibold">{b.user?.firstName} {b.user?.lastName}</div>
                        <small className="text-muted">{b.user?.email}</small>
                      </td>
                      <td>
                        <div className="fw-semibold">{b.flight?.flightNumber}</div>
                        <small className="text-muted">{b.flight?.departureAirport?.airportCode} ➔ {b.flight?.arrivalAirport?.airportCode}</small>
                      </td>
                      <td><span className="badge bg-light text-dark border">{b.flightClass?.replace("_", " ")}</span></td>
                      <td>{b.totalPassengers}</td>
                      <td className="fw-bold">₹{b.totalFare}</td>
                      <td>
                        <span className={`badge ${b.bookingStatus === "CANCELLED" ? "bg-secondary" : "bg-success"}`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td className="text-end pe-3"><TicketButton booking={b} /></td>
                    </tr>
                  ))}
                  {!bookings.length && (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-5">No bookings recorded yet.</td>
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
export default ViewBookings;
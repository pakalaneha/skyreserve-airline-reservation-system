import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import BookingService from "../../services/BookingService";
import TicketButton from "../TicketButton";

function MyBookings() {
  const userId = localStorage.getItem("userId"); const location = useLocation(); const [bookings, setBookings] = useState([]); const [message, setMessage] = useState(location.state?.message || "");

  const load = () => BookingService.getBookings(userId).then(r => setBookings(r.data)).catch(() => setMessage("Unable to load your bookings."));
  useEffect(() => { load(); }, []);

  const cancel = async (booking) => { if (!window.confirm(`Cancel booking ${booking.bookingCode}? The fare will be returned to your wallet.`)) return; try { await BookingService.cancelBooking(booking.bookingId); setMessage("Booking cancelled and fare refunded to your wallet."); load(); } catch { setMessage("Unable to cancel this booking."); } };

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">My Bookings</h1>
        </div>

        {message && <div className="alert alert-info alert-dismissible fade show border-0 shadow-sm">{message}</div>}

        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Reference</th>
                    <th>Flight</th>
                    <th>Route</th>
                    <th>Class</th>
                    <th>Passengers</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.bookingId}>
                      <td className="ps-4"><span className="fw-bold text-primary">{b.bookingCode}</span></td>
                      <td><span className="fw-semibold">{b.flight?.flightNumber}</span></td>
                      <td>{b.flight?.departureAirport?.airportCode} ➔ {b.flight?.arrivalAirport?.airportCode}</td>
                      <td><span className="badge bg-light text-dark border">{b.flightClass?.replace("_", " ")}</span></td>
                      <td>{b.totalPassengers}</td>
                      <td className="fw-bold">₹{b.totalFare}</td>
                      <td>
                        <span className={`badge ${b.bookingStatus === "CANCELLED" ? "bg-secondary" : "bg-success"}`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-inline-flex gap-2">
                          <TicketButton booking={b} />
                          {b.bookingStatus !== "CANCELLED" && (
                            <button className="btn btn-sm btn-outline-danger" onClick={() => cancel(b)}>
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!bookings.length && (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-5">
                        You have no bookings yet.
                      </td>
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
export default MyBookings;
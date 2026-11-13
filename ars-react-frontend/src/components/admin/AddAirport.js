import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import AirportService from "../../services/AirportService";

function AddAirport() {
  const [airport, setAirport] = useState({ airportName: "", airportCode: "", airportLocation: "", airportAddress: "" });
  const [airports, setAirports] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => { loadAirports(); }, []);

  const loadAirports = () => {
    AirportService.getAllAirports()
      .then((response) => setAirports(response.data))
      .catch(() => setMessage("Unable to load airports."));
  };

  const handleChange = (e) => setAirport({ ...airport, [e.target.name]: e.target.value });
  const resetForm = () => { setEditingId(null); setAirport({ airportName: "", airportCode: "", airportLocation: "", airportAddress: "" }); };

  const saveAirport = (e) => {
    e.preventDefault();
    if (editingId === null) {
      AirportService.addAirport(airport)
        .then(() => { setMessage("Airport added successfully."); resetForm(); loadAirports(); })
        .catch(() => setMessage("Unable to add airport."));
    } else {
      AirportService.updateAirport(editingId, airport)
        .then(() => { setMessage("Airport updated successfully."); resetForm(); loadAirports(); })
        .catch(() => setMessage("Unable to update airport."));
    }
  };

  const editAirport = (a) => {
    setEditingId(a.airportId);
    setAirport({ airportName: a.airportName, airportCode: a.airportCode, airportLocation: a.airportLocation, airportAddress: a.airportAddress });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAirport = (id) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      AirportService.deleteAirport(id)
        .then((response) => {
          setMessage("Airport deactivated successfully.");
          setAirports((current) => current.map((airportItem) => airportItem.airportId === id ? response.data : airportItem));
        })
        .catch(() => setMessage("Unable to deactivate airport."));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        {message && <div className="alert alert-info border-0 shadow-sm">{message}</div>}

        <div className="card shadow-sm border-0 mb-4 rounded-3">
          <div className="card-header bg-primary text-white py-3">
            <h4 className="card-title mb-0 fs-5">{editingId ? "Update Airport" : "Add New Airport"}</h4>
          </div>
          <div className="card-body p-4">
            <form onSubmit={saveAirport}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Airport Name</label>
                  <input type="text" className="form-control" name="airportName" value={airport.airportName} onChange={handleChange} required placeholder="e.g. John F. Kennedy International" />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Airport Code</label>
                  <input type="text" className="form-control" name="airportCode" value={airport.airportCode} onChange={handleChange} required placeholder="e.g. JFK" />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Location / City</label>
                  <input type="text" className="form-control" name="airportLocation" value={airport.airportLocation} onChange={handleChange} required placeholder="e.g. New York" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">Full Address</label>
                  <textarea className="form-control" rows="2" name="airportAddress" value={airport.airportAddress} onChange={handleChange} required placeholder="e.g. Queens, NY 11430, United States"></textarea>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success px-4">{editingId ? "Update Airport" : "Add Airport"}</button>
                {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
              </div>
            </form>
          </div>
        </div>

        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-header bg-dark text-white py-3">
            <h5 className="mb-0">Airport List</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">ID</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {airports.map((a) => (
                    <tr key={a.airportId} className={!a.active ? "table-secondary text-muted" : ""}>
                      <td className="ps-3 fw-semibold">{a.airportId}</td>
                      <td className="fw-bold">{a.airportName}</td>
                      <td><span className="badge bg-light text-dark border">{a.airportCode}</span></td>
                      <td>{a.airportLocation}</td>
                      <td><small className="text-muted">{a.airportAddress}</small></td>
                      <td>
                        <span className={`badge ${a.active ? "bg-success" : "bg-secondary"}`}>
                          {a.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        {a.active && (
                          <button className="btn btn-warning btn-sm" onClick={() => editAirport(a)}>Edit</button>
                        )}
                      </td>
                      <td className="text-center">
                        {a.active ? (
                          <button className="btn btn-danger btn-sm" onClick={() => deleteAirport(a.airportId)}>Delete</button>
                        ) : (
                          <span className="text-muted small">Unavailable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!airports.length && (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">No airports found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAirport;
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import AirplaneService from "../../services/AirplaneService";

const emptyPlane = { registrationNo: "", airplaneName: "", totalSeat: "", totalEconomySeat: "", totalBusinessSeat: "", totalFirstClassSeat: "" };

function AddAirplane() {
  const [plane, setPlane] = useState(emptyPlane);
  const [planes, setPlanes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadPlanes = () => AirplaneService.getAllAirplanes().then((res) => setPlanes(res.data)).catch(() => setMessage("Unable to load airplanes."));
  useEffect(() => { loadPlanes(); }, []);

  const change = (e) => setPlane({ ...plane, [e.target.name]: e.target.value });
  const reset = () => { setPlane(emptyPlane); setEditingId(null); };

  const save = async (e) => {
    e.preventDefault(); setMessage("");
    const classTotal = Number(plane.totalEconomySeat) + Number(plane.totalBusinessSeat) + Number(plane.totalFirstClassSeat);
    if (classTotal !== Number(plane.totalSeat)) return setMessage("The economy, business and first-class seats must equal total seats.");
    const payload = Object.fromEntries(Object.entries(plane).map(([key, value]) => [key, key.includes("Seat") ? Number(value) : value]));
    try { editingId ? await AirplaneService.updateAirplane(editingId, payload) : await AirplaneService.addAirplane(payload); setMessage(`Airplane ${editingId ? "updated" : "added"} successfully.`); reset(); loadPlanes(); }
    catch (error) { setMessage(error.response?.data?.message || "Unable to save airplane."); }
  };

  const edit = (item) => { setEditingId(item.airplaneId); setPlane({ ...emptyPlane, ...item }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async (id) => { if (window.confirm("Deactivate this airplane?")) { try { const response = await AirplaneService.deleteAirplane(id); setPlanes(current => current.map(p => p.airplaneId === id ? response.data : p)); setMessage("Airplane deactivated."); } catch { setMessage("Unable to deactivate airplane."); } } };

  return (
    <>
      <Navbar />
      <main className="container page-content my-4">
        <div className="row g-4">
          <section className="col-lg-5">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-dark text-white py-3">
                <h2 className="h5 mb-0">{editingId ? "Edit Airplane" : "Add New Airplane"}</h2>
              </div>
              <div className="card-body p-4">
                {message && <div className="alert alert-info py-2 border-0 shadow-sm">{message}</div>}
                <form onSubmit={save}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Registration Number</label>
                    <input required name="registrationNo" value={plane.registrationNo} onChange={change} className="form-control" placeholder="e.g. N12345" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Airplane Model / Name</label>
                    <input required name="airplaneName" value={plane.airplaneName} onChange={change} className="form-control" placeholder="e.g. Boeing 737" />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Total Seats</label>
                      <input required min="0" type="number" name="totalSeat" value={plane.totalSeat} onChange={change} className="form-control" />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Economy Seats</label>
                      <input required min="0" type="number" name="totalEconomySeat" value={plane.totalEconomySeat} onChange={change} className="form-control" />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Business Seats</label>
                      <input required min="0" type="number" name="totalBusinessSeat" value={plane.totalBusinessSeat} onChange={change} className="form-control" />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">First-Class Seats</label>
                      <input required min="0" type="number" name="totalFirstClassSeat" value={plane.totalFirstClassSeat} onChange={change} className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary flex-grow-1">{editingId ? "Update Airplane" : "Save Airplane"}</button>
                    {editingId && <button type="button" className="btn btn-outline-secondary" onClick={reset}>Cancel</button>}
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section className="col-lg-7">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-light py-3">
                <h1 className="h5 mb-0 fw-bold">Fleet Airplanes</h1>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-3">Name</th>
                        <th>Registration</th>
                        <th>Seat Config</th>
                        <th>Status</th>
                        <th className="text-end pe-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planes.map((p) => (
                        <tr key={p.airplaneId} className={!p.active ? "bg-light text-muted" : ""}>
                          <td className="ps-3 fw-bold">{p.airplaneName}</td>
                          <td><code>{p.registrationNo}</code></td>
                          <td>
                            <small className="d-block">E:{p.totalEconomySeat} | B:{p.totalBusinessSeat} | F:{p.totalFirstClassSeat}</small>
                            <span className="badge bg-light text-dark border">Total: {p.totalSeat}</span>
                          </td>
                          <td>
                            <span className={`badge ${p.active ? "bg-success" : "bg-secondary"}`}>
                              {p.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="text-end pe-3">
                            {p.active ? (
                              <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-primary" onClick={() => edit(p)}>Edit</button>
                                <button className="btn btn-outline-danger" onClick={() => remove(p.airplaneId)}>Deactivate</button>
                              </div>
                            ) : (
                              <span className="text-muted small">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!planes.length && (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">No airplanes added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default AddAirplane;
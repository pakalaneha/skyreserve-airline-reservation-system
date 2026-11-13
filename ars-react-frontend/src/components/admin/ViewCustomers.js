import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import UserService from "../../services/UserService";

function ViewCustomers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    UserService.getAllUsers()
      .then(res => setUsers(res.data));
  }, []);

  const customers = users.filter(user => user.role === "CUSTOMER");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredCustomers = customers.filter(user => {
    const searchableText = [
      user.userId,
      user.firstName,
      user.lastName,
      user.email,
      user.phone
    ].filter(Boolean).join(" ").toLowerCase();

    return searchableText.includes(normalizedSearchTerm);
  });

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Registered Customers</h3>
        </div>

        <div className="row align-items-center g-2 mb-3">
          <div className="col-md-7">
            <label className="visually-hidden" htmlFor="customer-search">Search customers</label>
            <input
              id="customer-search"
              type="search"
              className="form-control"
              placeholder="Search by name, email, phone, or ID"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="col-md-5 text-md-end text-muted small" aria-live="polite">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">ID</th>
                    <th>Customer Name</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(user => (
                      <tr key={user.userId}>
                        <td className="ps-3 fw-bold">{user.userId}</td>
                        <td className="fw-semibold">{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || "—"}</td>
                        <td><span className="badge bg-info text-dark">{user.role}</span></td>
                      </tr>
                    ))}
                  {!filteredCustomers.length && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        {customers.length ? "No customers match your search." : "No customers found."}
                      </td>
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

export default ViewCustomers;
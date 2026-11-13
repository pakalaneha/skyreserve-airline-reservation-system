import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddAirport from "./components/admin/AddAirport";
import AddAirplane from "./components/admin/AddAirplane";
import AddFlight from "./components/admin/AddFlight";
import ViewCustomers from "./components/admin/ViewCustomers";
import ViewFlights from "./components/admin/ViewFlights";
import ViewBookings from "./components/admin/ViewBookings";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import FlightList from "./components/customer/FlightList";
import Booking from "./components/customer/Booking";
import MyBookings from "./components/customer/MyBookings";
import Wallet from "./components/customer/Wallet";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";

const admin = (element) => <ProtectedRoute role="ADMIN">{element}</ProtectedRoute>;
const customer = (element) => <ProtectedRoute role="CUSTOMER">{element}</ProtectedRoute>;

function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<AuthPage />} />
    <Route path="/admin" element={admin(<AdminDashboard />)} />
    <Route path="/admin/airport" element={admin(<AddAirport />)} />
    <Route path="/admin/airplane" element={admin(<AddAirplane />)} />
    <Route path="/admin/flight" element={admin(<AddFlight />)} />
    <Route path="/admin/flights" element={admin(<ViewFlights />)} />
    <Route path="/admin/bookings" element={admin(<ViewBookings />)} />
    <Route path="/admin/customers" element={admin(<ViewCustomers />)} />
    <Route path="/customer" element={customer(<CustomerDashboard />)} />
    <Route path="/customer/flights" element={customer(<FlightList />)} />
    <Route path="/customer/book/:id" element={customer(<Booking />)} />
    <Route path="/customer/bookings" element={customer(<MyBookings />)} />
    <Route path="/customer/wallet" element={customer(<Wallet />)} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}

export default App;

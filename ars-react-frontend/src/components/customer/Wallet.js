import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import WalletService from "../../services/WalletService";

const initialPaymentDetails = {
  cardholder: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  upiId: "",
  bank: ""
};

const paymentMethodLabels = {
  card: "Card",
  upi: "UPI",
  netbanking: "Net banking"
};

const formatCardNumber = (value) => value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

function Wallet() {
  const userId = localStorage.getItem("userId");
  const [wallet, setWallet] = useState({});
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState(initialPaymentDetails);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    WalletService.getWallet(userId)
      .then(response => setWallet(response.data))
      .catch(() => {
        setMessage("Unable to load wallet.");
        setMessageType("danger");
      });
  }, [userId]);

  const updatePaymentDetail = (field, value) => {
    setPaymentDetails(current => ({ ...current, [field]: value }));
  };

  const isPaymentDetailsValid = () => {
    if (paymentMethod === "card") {
      const cardNumber = paymentDetails.cardNumber.replace(/\D/g, "");
      const expiryMatch = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(paymentDetails.expiry);
      if (!paymentDetails.cardholder.trim() || cardNumber.length < 12 || cardNumber.length > 19
        || !expiryMatch || !/^\d{3,4}$/.test(paymentDetails.cvv)) {
        return false;
      }

      const month = Number(expiryMatch[1]);
      const year = 2000 + Number(expiryMatch[2]);
      const now = new Date();
      return year > now.getFullYear()
        || (year === now.getFullYear() && month >= now.getMonth() + 1);
    }

    if (paymentMethod === "upi") {
      return /^[\w.-]+@[\w.-]+$/.test(paymentDetails.upiId.trim());
    }

    return Boolean(paymentDetails.bank);
  };

  const simulatePayment = async (event) => {
    event.preventDefault();
    setMessage("");

    const topUpAmount = Number(amount);
    if (!Number.isFinite(topUpAmount) || topUpAmount <= 0) {
      setMessage("Enter a valid top-up amount.");
      setMessageType("danger");
      return;
    }

    if (!isPaymentDetailsValid()) {
      setMessage("Enter valid demo payment details to continue.");
      setMessageType("danger");
      return;
    }

    setProcessing(true);
    try {
      const response = await WalletService.addMoney(userId, topUpAmount);
      setWallet(response.data);
      setAmount("");
      setPaymentDetails(initialPaymentDetails);
      setMessage(`Demo payment successful via ${paymentMethodLabels[paymentMethod]}. ₹${topUpAmount.toFixed(2)} added to your wallet.`);
      setMessageType("success");
    } catch {
      setMessage("Demo payment could not be completed. Your wallet has not been updated.");
      setMessageType("danger");
    } finally {
      setPaymentDetails(initialPaymentDetails);
      setProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container page-content my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h1 className="h4 fw-bold mb-3 text-center">My Digital Wallet</h1>
                {message && <div className={`alert alert-${messageType} border-0 py-2 small`} role="status">{message}</div>}

                <div className="bg-light p-4 rounded-4 my-4 text-center">
                  <small className="text-muted text-uppercase fw-bold">Current Balance</small>
                  <div className="display-5 fw-bold text-primary mt-1">₹ {Number(wallet.balance || 0).toFixed(2)}</div>
                </div>

                <form onSubmit={simulatePayment} autoComplete="off">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="top-up-amount">Top Up Funds</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-white">₹</span>
                      <input
                        id="top-up-amount"
                        type="number"
                        min="1"
                        step="0.01"
                        className="form-control"
                        placeholder="Amount"
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <fieldset className="mb-3">
                    <legend className="form-label fw-semibold fs-6">Demo payment method</legend>
                    <div className="btn-group w-100" role="group" aria-label="Demo payment method">
                      {Object.entries(paymentMethodLabels).map(([method, label]) => (
                        <button
                          key={method}
                          type="button"
                          className={`btn ${paymentMethod === method ? "btn-primary" : "btn-outline-primary"}`}
                          aria-pressed={paymentMethod === method}
                          onClick={() => {
                            setPaymentMethod(method);
                            setMessage("");
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {paymentMethod === "card" && (
                    <>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="demo-cardholder">Name on card</label>
                        <input
                          id="demo-cardholder"
                          className="form-control"
                          autoComplete="off"
                          value={paymentDetails.cardholder}
                          onChange={event => updatePaymentDetail("cardholder", event.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="demo-card-number">Card number</label>
                        <input
                          id="demo-card-number"
                          className="form-control"
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength="23"
                          placeholder="Any 12–19 digit demo number"
                          value={paymentDetails.cardNumber}
                          onChange={event => updatePaymentDetail("cardNumber", formatCardNumber(event.target.value))}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label" htmlFor="demo-card-expiry">Expiry (MM/YY)</label>
                          <input
                            id="demo-card-expiry"
                            className="form-control"
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength="5"
                            placeholder="MM/YY"
                            value={paymentDetails.expiry}
                            onChange={event => updatePaymentDetail("expiry", formatExpiry(event.target.value))}
                            required
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label" htmlFor="demo-card-cvv">CVV</label>
                          <input
                            id="demo-card-cvv"
                            type="password"
                            className="form-control"
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength="4"
                            value={paymentDetails.cvv}
                            onChange={event => updatePaymentDetail("cvv", event.target.value.replace(/\D/g, "").slice(0, 4))}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mb-3">
                      <label className="form-label" htmlFor="demo-upi-id">UPI ID</label>
                      <input
                        id="demo-upi-id"
                        className="form-control"
                        autoComplete="off"
                        placeholder="name@bank"
                        value={paymentDetails.upiId}
                        onChange={event => updatePaymentDetail("upiId", event.target.value)}
                        required
                      />
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="mb-3">
                      <label className="form-label" htmlFor="demo-bank">Select bank</label>
                      <select
                        id="demo-bank"
                        className="form-select"
                        value={paymentDetails.bank}
                        onChange={event => updatePaymentDetail("bank", event.target.value)}
                        required
                      >
                        <option value="">Choose a demo bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                      </select>
                      <small className="form-text text-muted">No bank login or password is requested.</small>
                    </div>
                  )}

                  <div className="alert alert-warning small mb-3" role="note">
                    Demo only: no real payment is made. Use fake details only. Payment details are not sent to the server or saved.
                  </div>

                  <button className="btn btn-primary btn-lg w-100 fw-semibold" disabled={processing}>
                    {processing ? "Processing demo payment…" : `Pay ₹${Number(amount || 0).toFixed(2)}`}
                  </button>
                </form>

                <p className="text-muted small mt-4 mb-0 text-center">
                  Booking fares are automatically deducted from your wallet balance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Wallet;

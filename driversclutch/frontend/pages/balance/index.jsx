import { useState } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const TopUpForm = ({ setIsPopupVisible }) => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }), // amount in cents
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        setIsPopupVisible(false); // Close popup on successful payment
      }
    }

    setLoading(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCancel = () => {
    setIsPopupVisible(false); // Function to close the popup
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="container-row">
          <div>
            <h3>Amount</h3>
          </div>
          <div>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="1"
              step="any"
              inputMode="numeric"
              className="large-input"
            />
          </div>
        </div>
        <div className='container-row'>
          <CardElement />
        </div>
        <div className='container-row'>
          <div className="buttons-container">
            <button className="book-button" type="submit" disabled={!stripe || loading}>
              {loading ? 'Processing...' : 'Top Up'}
            </button>
            <button className="book-button" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const Dashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Top-up Balance</h2>
        <p>Add credits to your account</p>
        <button className="book-button" onClick={togglePopup}>
          Add Credits
        </button>
        <div id="popupOverlay" className={`popup-overlay ${isPopupVisible ? 'show' : ''}`}>
          <div className="popup-box">
            <Elements stripe={stripePromise}>
              <TopUpForm setIsPopupVisible={setIsPopupVisible} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  );
}

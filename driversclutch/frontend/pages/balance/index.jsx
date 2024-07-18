import { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/card/card.css';
import '@/app/components/background/background.css';
import '@/app/components/dashboard/dashboard.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const TopUpForm = ({ setIsPopupVisible, isPopupVisible, fetchBalanceData }) => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!isPopupVisible) {
      resetForm();
    }
  }, [isPopupVisible]);

  const resetForm = () => {
    setAmount(0); // Reset amount to 0
    setPaymentStatus(null); // Reset payment status
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDocID = localStorage.getItem('userDocID');

    const topUpValue = {
      studentID: userDocID,
      amount: Number(amount)
    }

    setLoading(true);

    // const res = await fetch('/api/create-payment-intent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ amount: amount * 100 }), // amount in cents
    // });

    // const { clientSecret } = await res.json();

    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //   },
    // });

    try {
      console.log('trying to put', topUpValue);
      const response = await axios.put('http://localhost:8001/students/balance/topup', topUpValue, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Payment succeeded!');
      console.log('Balance updated: ', response.data);
      setPaymentStatus('success');
      fetchBalanceData();
      setTimeout(() => {
        setIsPopupVisible(false); 
      }, 2000);
    } catch (error) {
      console.log('Error top-up balance: ', error);
      setPaymentStatus('error');
    }
  };
    // setLoading(false);

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
          {paymentStatus === 'success' && (
            <p style={{ color: 'green', marginTop: '1rem' }}>Payment succeeded!</p>
          )}
          {paymentStatus === 'error' && (
            <p style={{ color: 'red', marginTop: '1rem' }}>Payment failed. Please try again.</p>
          )}
        </div>
      </div>
    </form>
  );
};

const Dashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBalanceData = async () => {
    try {
      const userDocID = localStorage.getItem('userDocID');
      if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/students/balance/?id=${userDocID}`);
      console.log('API Response:', response.data);
      setBalanceData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  if (!balanceData) {
    return null;
  }

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Top-up Balance</h2>
        <p>Add credits to your account</p>
        <h3>Current Credit Balance: ${balanceData.balance}</h3>
        <br></br>
        <button className="book-button" onClick={ togglePopup }>
          Add Credits
        </button>
        <div id="popupOverlay" className={`popup-overlay ${isPopupVisible ? 'show' : ''}`}>
          <div className="popup-box">
            <Elements stripe={stripePromise}>
              <TopUpForm setIsPopupVisible={setIsPopupVisible} isPopupVisible={isPopupVisible} fetchBalanceData={fetchBalanceData}/>
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

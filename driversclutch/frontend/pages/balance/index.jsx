import { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar/navbar';
import './page.css';
import '@/app/components/background/background.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { url } from '../../src/app/firebase/firebase_config';

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

    try {
      console.log('trying to put', topUpValue);
      const response = await axios.put(`${url}/students/balance/topup`, topUpValue, {
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
      <div className="balance-container">
        <div className="balance-container-row">
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
              className="balance-large-input"
            />
          </div>
        </div>
        <div className='balance-container-row'>
          <CardElement />
        </div>
        <div className='balance-container-row'>
          <div className="balance-buttons-container">
            <button className="balance-book-button" type="submit" disabled={!stripe || loading}>
              {loading ? 'Processing...' : 'Top Up'}
            </button>
            <button className="balance-book-button" type="button" onClick={handleCancel}>
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
      const response = await axios.get(`${url}/students/balance/?id=${userDocID}`);
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
    <div className="balance-dashboard">
      <div className="balance-dashboard-container">
        <h2>Top-up Balance</h2>
        <p>Add credits to your account</p>
        <h3>Current Credit Balance: ${balanceData.balance}</h3>
        <br></br>
        <button className="balance-book-button" onClick={ togglePopup }>
          Add Credits
        </button>
        <div id="balance-popupOverlay" className={`balance-popup-overlay ${isPopupVisible ? 'show' : ''}`}>
          <div className="balance-popup-box">
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

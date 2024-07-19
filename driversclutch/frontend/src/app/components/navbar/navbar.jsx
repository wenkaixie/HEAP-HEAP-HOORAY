"use client"

import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import './navbar.css';
import { IconContext } from 'react-icons';
import Link from "next/link";
import FBInstanceAuth from "../../firebase/firebase_auth";
import { useRouter } from "next/router";
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const auth = FBInstanceAuth.getAuth();
  const router = useRouter();
	const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update user state if user is logged in
      } else {
        setUser(null); // Reset user state if user is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

const handleLogout = async (event) => {
  event.preventDefault();
  setError(null);

  try {
      await signOut(auth); // Use signOut directly from firebase/auth
      console.log('User signed out from Firebase');
      
      localStorage.removeItem('userToken'); // Clear the token from local storage
      console.log('userToken removed from localStorage');
      
      localStorage.removeItem('userDocID'); // Clear the userDocID from local storage
      console.log('userDocID removed from localStorage');

      localStorage.removeItem('userRole'); // Clear the userRole from local storage
      console.log('userToken removed from localStorage');

      router.push('/login');
  } catch (error) {
      setError(`Unexpected error: ${error.message}`);
      console.error('Error during logout:', error);
  }
};

if (!user) {
  return null;
}

  return (
    <nav className="header">
      <Link href='../../../../home'>
        <img src='/assets/logo_black.png' className='logo' alt="Logo" />
      </Link>
      <div className="menu-icon" onClick={handleShowNavbar}>
        <IconContext.Provider
          value={{color: 'black', size: '40px'}}
        >
          <RxHamburgerMenu />
        </IconContext.Provider>
      </div>
      <div className={`nav-elements ${showNavbar && 'active'}`}>
        <ul>
          <li>
            <Link href="#">Logged in as: {user.email}</Link>
          </li>
          <li>
            <Link href="#">Our Instructors</Link>
            <div className="dropdown-content">
              <Link href="../../../../manual">Class 3</Link>
              <Link href="../../../../auto">Class 3A</Link>
            </div>
          </li>
          <li>
            <Link href="#">Theory Practices</Link>
            <div className="dropdown-content">
              <Link href="../../../../btt">Basic Theory Test</Link>
              <Link href="../../../../ftt">Final Theory Test</Link>
            </div>
          </li>
          <li>
            <Link href="#">Booking</Link>
            <div className="dropdown-content">
              <Link href="../../../../bookingList">My Bookings</Link>
              <Link href="../../../../theoryTest">Theory Test</Link>
              <Link href="../../../../booking">Practical Lesson</Link>
              <Link href="#">Simulator</Link>
            </div>
          </li>
          <li>
            <Link href="#">Account</Link>
            <div className="dropdown-content">
              <Link href="../../../../profile">Manage Profile</Link>
              <Link href="../../../../balance">Top-up Balance</Link>
              <Link href="" onClick={handleLogout}>Sign Out</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

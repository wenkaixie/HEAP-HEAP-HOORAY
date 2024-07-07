"use client"

import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import './navbar.css';
import { IconContext } from 'react-icons';
import Link from "next/link";
import FBInstanceAuth from "../../firebase/firebase_auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const auth = FBInstanceAuth.getAuth();
  const router = useRouter();
	const [error, setError] = useState(null);

  const handleLogout = async (event) => {
    event.preventDefault();
    setError(null);
    
    try {
      FBInstanceAuth.logout(auth);
      router.push('/login');
    } catch (error) {
        setError(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <nav className="header">
      <Link href='../../../../instructorHome'>
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
            <Link href="../../../../instructorStudents">My Students</Link>
          </li>
          <li>
            <Link href="../../../../instructorAvailability">Lesson Availability</Link>
          </li>
          <li>
            <Link href="#">Account</Link>
            <div className="dropdown-content">
              <Link href="../../../../instructorProfile">Manage Profile</Link>
              <Link href="" onClick={handleLogout}>Sign Out</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

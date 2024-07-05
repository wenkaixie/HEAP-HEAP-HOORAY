"use client"

import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import './navbar.css';
import { IconContext } from 'react-icons';
import Link from "next/link";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="header">
      <Link href='../../../../pages/home'>
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
          <a href="#">Our Instructors</a>
            <div className="dropdown-content">
              <a href="../../../../pages/manual">Class 3</a>
              <a href="../../../../pages/auto">Class 3A</a>
            </div>
          </li>
          <li>
            <a href="/">Theory Practices</a>
          </li>
          <li>
            <a href="#">Booking</a>
            <div className="dropdown-content">
              <a href="#">Theory test</a>
              <a href="../../../../pages/booking">Practical Lesson</a>
              <a href="#">Simulator</a>
            </div>
          </li>
          <li>
            <a href="#">Account</a>
            <div className="dropdown-content">
              <a href="../../../../pages/profile">Manage Profile</a>
              <a href="../../../../pages/balance">Top-up Balance</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

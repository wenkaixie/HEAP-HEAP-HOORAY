"use client";

import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import './navbar.css';
import { IconContext } from 'react-icons';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="header">
        <a href='../screens/home'>
          <img src='/assets/logo_black.png' className='logo' />
        </a>
        <div className="menu-icon" onClick={handleShowNavbar}>
            <IconContext.Provider
                value={{color: 'black', size: '40px'}}
            >
                <RxHamburgerMenu />
            </IconContext.Provider>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <a href="/">Theory Practices</a>
            </li>
            <li>
              <a href="/">Private Instructors</a>
            </li>
            <li>
              <a href="../screens/booking">Lesson Booking</a>
            </li>
            <li>
              <a href="/">Test Booking</a>
            </li>
          </ul>
        </div>
    </nav>
  )
}

export default Navbar
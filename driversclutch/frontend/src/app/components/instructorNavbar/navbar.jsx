"use client"

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
      <a href='../../../../pages/instructorHome'>
        <img src='/assets/logo_black.png' className='logo' alt="Logo" />
      </a>
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
            <a href="../../../../pages/instructorStudents">My Students</a>
          </li>
          <li>
            <a href="../../../../pages/instructorAvailability">Lesson Availability</a>
          </li>
          <li>
            <a href="#">Account</a>
            <div className="dropdown-content">
              <a href="../../../../pages/instructorProfile">Manage Profile</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

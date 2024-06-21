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
      <a href='../screens/home'>
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
            <a href="../screens/instructorStudents">My Students</a>
          </li>
          <li>
            <a href="../screens/instructorAvailability">Lesson Availability</a>
          </li>
          <li>
            <a href="#">Account</a>
            <div className="dropdown-content">
              <a href="../screens/instructorProfile">Manage Profile</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

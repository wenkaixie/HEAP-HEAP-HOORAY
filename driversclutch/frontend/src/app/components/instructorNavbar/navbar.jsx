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
      <Link href='../../../../pages/instructorHome'>
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
            <Link href="../../../../pages/instructorStudents">My Students</Link>
          </li>
          <li>
            <Link href="../../../../pages/instructorAvailability">Lesson Availability</Link>
          </li>
          <li>
            <Link href="#">Account</Link>
            <div className="dropdown-content">
              <Link href="../../../../pages/instructorProfile">Manage Profile</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

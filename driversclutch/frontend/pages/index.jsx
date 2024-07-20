import React from 'react';
import Link from 'next/link';
import './page.css';
import { BiLogIn } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";


const HomePage = () => {
    return (
        <main className='main'>
            <header className='header'>
                <div className='logo'>
                    <img src="/assets/logo_black.png" alt="DriversClutch" />
                </div>
                <div className='authLinks'>
                    <Link href="/login">
                        <div className='login-container'>
                            <BiLogIn className='login-icon' />
                            <span>Login</span>
                        </div>
                    </Link>
                </div>
            </header>
            <div className='hero'>
                <div className='heroImage'>
                    <img src="/assets/landing_page.jpg" alt="Driving" />
                </div>
                <div className='heroText'>
                    <h1>
                        Learn how to drive <em>easier</em> with <span className='boldText'>DriversClutch!</span>
                    </h1>
                </div>
            </div>
            <section className='features'>
                <h2>Our Features</h2>
                <div className='featureList'>
                    <div className='feature feature1'>
                    <IoCalendarOutline className='calendar-icon' />
                        <h3>Book Lessons</h3>
                        <p>Book driving lessons <em><strong>easily</strong></em> and manage your schedule with <em><strong>flexibility</strong></em>.</p>
                    </div>
                    <div className='feature feature2'>
                    <IoNewspaperOutline className='paper-icon' />
                        <h3>Theory Practices</h3>
                        <p>Practice driving theory with our <em><strong>comprehensive</strong></em> resources.</p>
                    </div>
                    <div className='feature feature3'>
                    <MdOutlinePeopleAlt className='people-icon' />
                        <h3>Private Instructors Information</h3>
                        <p><em><strong>Find</strong></em> and <em><strong>connect</strong></em> with our private driving instructors.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;

import React from 'react';
import Link from 'next/link';
import './page.css';

const HomePage = () => {
    return (
        <main className='main'>
            <header className='header'>
                <div className='logo'>
                    <img src="/assets/logo_black.png" alt="DriversClutch" />
                </div>
                <div className='authLinks'>
                    <Link href="/login">
                        Login
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
                    <div className='feature'>
                        <h3>Book Lessons</h3>
                        <p>Description</p>
                    </div>
                    <div className='feature'>
                        <h3>Theory Practices</h3>
                        <p>Description</p>
                    </div>
                    <div className='feature'>
                        <h3>Private Instructors Information</h3>
                        <p>Description</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;

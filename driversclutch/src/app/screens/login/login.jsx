"use client";

import React, { useEffect } from 'react';
import './login.css';
// import applogo from '../assets/logo_white.png';

const Login = () => {
    useEffect(() => {
        const btns = document.querySelectorAll('.btn');

        const handleClick = (event) => {
            // Remove styles from all buttons
            btns.forEach(btn => {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            });

            // Apply styles to the clicked button
            event.target.style.backgroundColor = '#e9f4ff';
            event.target.style.color = '#4a9ff3';
            event.target.style.borderTopLeftRadius = '8px';
            event.target.style.borderTopRightRadius = '8px';
        };

        // Add event listeners to all buttons
        btns.forEach(btn => btn.addEventListener('click', handleClick));

        // Make the Student button the default selected button
        const studentButton = document.querySelector('.btn[value="student"]');
        if (studentButton) {
            studentButton.style.backgroundColor = '#e9f4ff';
            studentButton.style.color = '#4a9ff3';
        }

        // Cleanup event listeners on component unmount
        return () => {
            btns.forEach(btn => btn.removeEventListener('click', handleClick));
        };
    }, []);

    return (
        <div>
            <div className='container'>
                <img src='/assets/logo_white.png' alt="logo_img" className='applogo' />
            </div>
            <div className='tab-form'>
                <form action="">
                    <div className='tab-header'> 
                        <button className='btn' type="button" value='student'>Student</button>
                        <button className='btn' type="button" value='instructor'>Instructor</button>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button className='submit' type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;



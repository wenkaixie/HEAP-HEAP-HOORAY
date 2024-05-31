import React from 'react';
import './loginform.css';
import { FaUserAlt, FaLock, FaCar } from "react-icons/fa";

const LoginForm = () => {
    return (
        <div className='container'>
            <div className="left-side"></div>
            <div className='wrapper'>
                <div className="right-side">
                    <form action="">
                        <h1><FaCar className='logo'/></h1>
                        <h1>DriversClutch</h1>
                        <div className='tab_box'>
                            <button className='tab_btn'>Student</button>
                            <button className='tab_btn'>Instructor</button>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required />
                            <FaUserAlt className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required />
                            <FaLock className='icon' />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button className='submit_btn' type="submit">Login</button>

                        <div className="register-link">
                            <p>Don't have an account? <a href="#">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
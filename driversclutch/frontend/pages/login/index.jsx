"use client";

import React, { useEffect, useState } from 'react';
import './page.css';
//import Link from "next/link";
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { useRouter } from 'next/router';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const auth = FBInstanceAuth.getAuth();
	const router = useRouter();
	const [error, setError] = useState(null);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	useEffect(() => {
		const btns = document.querySelectorAll(".btn");

		const handleClick = (event) => {
			// Remove styles from all buttons
			btns.forEach((btn) => {
				btn.style.backgroundColor = "";
				btn.style.color = "";
			});

			// Apply styles to the clicked button
			event.target.style.backgroundColor = "#e9f4ff";
			event.target.style.color = "#4a9ff3";
			event.target.style.borderTopLeftRadius = "8px";
			event.target.style.borderTopRightRadius = "8px";
		};

		// Add event listeners to all buttons
		btns.forEach((btn) => btn.addEventListener("click", handleClick));

		// Make the Student button the default selected button
		const studentButton = document.querySelector('.btn[value="student"]');
		if (studentButton) {
			studentButton.style.backgroundColor = "#e9f4ff";
			studentButton.style.color = "#4a9ff3";
		}

		// Cleanup event listeners on component unmount
		return () => {
			btns.forEach((btn) => btn.removeEventListener("click", handleClick));
		};
	}, []);

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	console.log("submitting form");
	// 	FBInstanceAuth.login(auth, username, password);
	// };

    const handleSubmit = async (event) => {
		event.preventDefault();
		setError(null);
	
		try {
		  const { data, errorCode } = await FBInstanceAuth.login(auth, username, password);
		  if (data) {
			router.push('/home');
		  } else {
			setError(`Login failed: ${errorCode}`);
		  }
		} catch (error) {
		  setError(`Unexpected error: ${error.message}`);
		}
	  };
	

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    console.log("google login");
    FBInstanceAuth.googleLogin(auth);
  }

	return (
		<div className="container">
			<img src="/assets/logo_white.png" alt="logo_img" className="applogo" />
			<div className="tab-form">
				<form action="">
					<div className="tab-header">
						<button className="btn" type="button" value="student">
							Student
						</button>
						<button className="btn" type="button" value="instructor">
							Instructor
						</button>
					</div>
					<div className="input-box">
						<input
							type="text"
							placeholder="Username"
							required
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
					<div className="input-box">
						<input
							type="password"
							placeholder="Password"
							required
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>

					<div className="remember-forgot">
						<label>
							<input type="checkbox" />
							Remember me
						</label>
						<a href="#">Forgot password?</a>
					</div>

					<button className="submit" type="submit" onClick={handleSubmit}>
						Login
					</button>

					<div className="register-link">
						<p>
							Don't have an account? <a href="#">Register</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

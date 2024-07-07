"use client";

import React, { useEffect, useState } from 'react';
import './page.css';
//import Link from "next/link";
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { useRouter } from 'next/router';
import {FirestoreDB, auth} from '../../src/app/firebase/firebase_config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	//const auth = FBInstanceAuth.getAuth();
	const router = useRouter();
	const [error, setError] = useState(null);
	// const [user, loading] = useAuthState(auth);

	// if (loading) {
	// 	return <div>Loading...</div>
	// }

	// if (user) {
	// 	router.push("/home");
	// 	return <div>Welcome {user.displayName}</div>;
	// }

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
			const userCredential = await signInWithEmailAndPassword(auth, username, password);
			const user = userCredential.user;
			if (user) {
				console.log('Login successful');
				const token = await getIdToken(user);
				console.log('User token:', token);
	
				// Store the token in local storage or cookies
				localStorage.setItem('userToken', token);
	
				const role = await checkUserRole(user.email);
				console.log(role);
				if (role === 'student') {
					router.push('/home');
				} else if (role === 'instructor') {
					router.push('/instructorHome');
				}
			} else {
				setError(`Login failed: ${errorCode}`);
			}
		} catch (error) {
			setError(`Unexpected error: ${error.message}`);
		}
	};

const checkUserRole = async (email) => {
	console.log('Checking user role');
	console.log('db:', FirestoreDB);
	try {
		// Check if email exists in the students collection
		const studentQuery = query(collection(FirestoreDB, 'students'), where('email', '==', email));
		const studentSnapshot = await getDocs(studentQuery);
		if (!studentSnapshot.empty) {
			console.log('User is a student');
			return 'student';
		}

		// Check if email exists in the instructors collection
		const instructorQuery = query(collection(FirestoreDB, 'instructors'), where('email', '==', email));
		const instructorSnapshot = await getDocs(instructorQuery);
		if (!instructorSnapshot.empty) {
			console.log('User is an instructor');
			return 'instructor';
		}

		console.log('User not found in any role');
		return null;

	} catch (error) {
		console.error('Error checking user role: ', error);
		return null;
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

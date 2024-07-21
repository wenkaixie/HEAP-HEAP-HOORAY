"use client";

import React, { useState } from 'react';
import './page.css';
//import Link from "next/link";
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { useRouter } from 'next/router';
import {FirestoreDB, auth} from '../../src/app/firebase/firebase_config';
import { collection, query, where, getDocs, Firestore } from 'firebase/firestore';
//import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import '../../src/app/components/card/card.css';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const auth = FBInstanceAuth.getAuth();
	const router = useRouter();
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleUsernameChange = (event) => {
	setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
	setPassword(event.target.value);
	};

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
				setShowModal(true);
			}
		} catch (error) {
			setError(`Unexpected error: ${error.message}`);
			setShowModal(true);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setError(null);
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
				const studentDoc = studentSnapshot.docs[0];
				console.log("Hello " + studentDoc.id);
				// Store the uid in local storage or cookies
				localStorage.setItem('userDocID', studentDoc.id);
				localStorage.setItem('userRole', 'student');
				return 'student';
			}

			// Check if email exists in the instructors collection
			const instructorQuery = query(collection(FirestoreDB, 'instructors'), where('email', '==', email));
			const instructorSnapshot = await getDocs(instructorQuery);
			if (!instructorSnapshot.empty) {
				console.log('User is an instructor');
				const instructorDoc = instructorSnapshot.docs[0];
				console.log("Hello " + instructorDoc.id);
				// Store the uid in local storage or cookies
				localStorage.setItem('userDocID', instructorDoc.id);
				localStorage.setItem('userRole', 'instructor');
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
	};

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <img src="/assets/logo_black.png" alt="Drivers Clutch Logo" className="applogo" />
        <div className="notification">
          <p>
            Please login with your credentials to access the booking system.
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text" 
              placeholder="Email"
              required
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
		  <br></br>
          <button className="submit" type="submit">
            Access To Booking System
          </button>
        </form>
		{showModal && (
					<div className="modal">
						<div className="modal-content">
							<p>{"Invalid email or password entered. Please try again."}</p>
							<button onClick={closeModal}>Close</button>
						</div>
					</div>
				)}
      </div>
    </div>
  );
};

export default Login;


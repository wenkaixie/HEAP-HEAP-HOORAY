import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyC7GxjUDhjnIVdoKJ3-tGPqATkXtLPMpi8",
	authDomain: "driversclutch.firebaseapp.com",
	projectId: "driversclutch",
	storageBucket: "driversclutch.appspot.com",
	messagingSenderId: "893202368837",
	appId: "1:893202368837:web:63ffcec7a032fd303fd62c",
	measurementId: "G-T4XHRD4W9Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
const FirestoreDB = getFirestore(app);

export { FirestoreDB, auth };

export default app;

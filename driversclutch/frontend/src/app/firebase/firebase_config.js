import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

export const FirestoreDB = getFirestore(app);

export default app;

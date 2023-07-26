import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyC3hgr7V7phtr1dRCHnP-Jc0hfPwAKjzfw",
	authDomain: "todoreactnative-9579d.firebaseapp.com",
	projectId: "todoreactnative-9579d",
	storageBucket: "todoreactnative-9579d.appspot.com",
	messagingSenderId: "513376295904",
	appId: "1:513376295904:web:04cee454685911e8d6e985",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

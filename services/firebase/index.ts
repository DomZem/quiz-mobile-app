import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, db, provider };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

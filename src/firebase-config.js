import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj789MlXvHjTce7dHUUbzR1KvNN--jrhc",
  authDomain: "fir-auth-46fc3.firebaseapp.com",
  projectId: "fir-auth-46fc3",
  storageBucket: "fir-auth-46fc3.appspot.com",
  messagingSenderId: "337232192007",
  appId: "1:337232192007:web:1fae41cd93b82a246fc0a2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
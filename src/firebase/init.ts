import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4aTW7_akFDoZPXsAHhJtXHYKppBoSHeU",
  authDomain: "netflix-clone-af08f.firebaseapp.com",
  projectId: "netflix-clone-af08f",
  storageBucket: "netflix-clone-af08f.appspot.com",
  messagingSenderId: "476338442021",
  appId: "1:476338442021:web:cbfc0cdd71f17f001f54cc",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };

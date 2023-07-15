import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD7nbyoiNXC0HIfYYa6jp_vsEmdNyslmXU",
  authDomain: "clone-f804f.firebaseapp.com",
  projectId: "clone-f804f",
  storageBucket: "clone-f804f.appspot.com",
  messagingSenderId: "186028265767",
  appId: "1:186028265767:web:c699fc3bca2a342ddb9902",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

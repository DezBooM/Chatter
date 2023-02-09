import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDNWEPbVQuULnRTu4RSZoTenY_k6Hrqrw4",
  authDomain: "chatter-c6bbb.firebaseapp.com",
  projectId: "chatter-c6bbb",
  storageBucket: "chatter-c6bbb.appspot.com",
  messagingSenderId: "170129689577",
  appId: "1:170129689577:web:e37dc880c3678119ac9978",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage()
export const db = getFirestore()

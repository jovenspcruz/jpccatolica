// ==================================
// JPC FIREBASE INIT
// ==================================

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { firebaseConfig } 
from "./firebase-config.js";


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export { db };
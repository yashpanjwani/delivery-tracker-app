// server/firebase-key.js
import admin from "firebase-admin";

const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT; // env var we will set

if (!serviceAccountJSON) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT env var");
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountJSON);
} catch (err) {
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", err);
  throw err;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const db = admin.firestore();
export default admin;

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { assertFirebaseConfigured, auth } from "../../config/firebase.js";

function getAuthInstance() {
  assertFirebaseConfigured();
  return auth;
}

export function subscribeToAuthChanges(onUserChange, onError) {
  return onAuthStateChanged(getAuthInstance(), onUserChange, onError);
}

export async function registerWithEmail({ displayName, email, password }) {
  const userCredential = await createUserWithEmailAndPassword(
    getAuthInstance(),
    email,
    password
  );

  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  return userCredential.user;
}

export async function loginWithEmail({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(
    getAuthInstance(),
    email,
    password
  );

  return userCredential.user;
}

export function logout() {
  return firebaseSignOut(getAuthInstance());
}

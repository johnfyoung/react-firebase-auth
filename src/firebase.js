import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require("dotenv").config();

const firebaseConfig = require(process.env.REACT_APP_FIREBASE_CONFIG);

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  console.log("Generating User Document...");
  if (!user) return;
  const userRef = await firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
      console.log("...finished generating document");
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  console.log("Fetching User Document...");
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    console.log("...finished fetching User Document: ", userDocument.data());
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

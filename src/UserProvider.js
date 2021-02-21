import { createContext, useState, useEffect } from "react";
import { auth, generateUserDocument, getUserDocument } from "./firebase";

export const UserContext = createContext({
  user: undefined,
  profile: undefined,
  isSigningUp: false,
});

export const login = async (email, password) => {
  try {
    const userAuth = await auth.signInWithEmailAndPassword(email, password);
    return { success: true, user: userAuth };
  } catch (error) {
    console.log("Error Signing up with email and password");
    return { success: false, error: error };
  }
};

export const signup = async ({ email, password, ...additionalFields }) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const newUserDoc = await generateUserDocument(user, additionalFields);
    return { success: true, user: newUserDoc };
  } catch (error) {
    console.log("Error Signing up with email and password");
    return { success: false, error: error };
  }
};

export const signout = async () => {
  await auth.signOut();
};

function UserProvider(props) {
  const [state, setState] = useState({
    user: undefined,
    profile: undefined,
  });

  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    console.log("Starting User State: ", state);

    auth.onAuthStateChanged(async (userAuth) => {
      console.log("User State changing...", userAuth);
      setState({
        user: userAuth,
        profile: {},
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      console.log("Trying to get profile. Are we signing up?", isSigningUp);
      if (state.user && !isSigningUp) {
        const profile = await getUserDocument(state.user.uid);
        console.log("...changed User State got new profile", profile);
        setState((s) => ({
          ...s,
          profile,
        }));
      }
    })();
  }, [state.user, isSigningUp]);

  return (
    <UserContext.Provider value={{ ...state, isSigningUp, setIsSigningUp }}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserProvider;

# react-firebase-auth

An example of using react with firebase authentication with firestore.

This app was bootstrpped with `create-react-app` and uses the `react-bootstap` component library.

## Background

I had some students trying to connect `firebase` auth with user profiles stored in `firestore` and I was having a hard time keeping it all straight in their code. So I felt a need to build a sample app of my own to discover the quirks of using this set up with react.

There is [this tutorial](https://blog.logrocket.com/user-authentication-firebase-react-apps/) that does a pretty good job of setting it up. But I had some thoughts about how to protect the API keys and about accessing the firestore post-sign in and post-sign up.

## Storing and protecting firebase keys

**TL;DR** - create a key for production that should whitelist to your production domain and create another key with no restrictions (or maybe the IP address of your dev machine) for local development that should never leave your machine.

Any key used by a web client is fully exposed to the world, so the key used for production needs to be limited for use by your deployment domain only. It is also best practice to keep API keys out of the git repository.

How does one do this?

1. [Create a Firebase project](https://console.firebase.google.com/). A project can have many apps, the assumption being that you might have a web, ios and android applications that use the same firebase backend.
2. Add a Web Application to this project
3. On the result screen, copy the `firebaseConfig` object from the code snippet and paste it into a file called `firebaseConfig.json` in your React application's `src` directory.
4. Edit the `js` in your `json` file to make sure it is properly formed `json`:

```json
{
  "apiKey": "your key here",
  "authDomain": "Your auth domain here",
  "projectId": "your project id here",
  "storageBucket": "your storage bucket",
  "messagingSenderId": "your messaging sender id",
  "appId": "your app id",
  "measurementId": "your measurement id"
}
```

5. Add `firebaseConfig.json` to your `.gitignore`. This ensures that this file will only be used locally.
6. Add a `.env` file (make sure it is also added to the `.gitignore`). The `.env` should have this key

```sh
REACT_APP_FIREBASE_CONFIG="./firebaseConfig.json"
```

7. The `src/firebase.js` file in this project will open that file into a variable which allows this app to connect to firebase from a locally hosted app.
8. Go to [your google cloud credentials screen](https://console.cloud.google.com/apis/credentials). Make sure you choose your firebase project from the drop down.
9. Under "API Keys", you should see a key labelled "Browser key (auto created by Firebase). Click the edit pencil and name this key "Dev". Click save.
10. Back on the Credentials screen, click the "CREATE CREDENTIALS" button at the top of the screen. Select API Key.
11. In the result window, click "Restrict Key"
12. Name this one "Production"
13. Select "HTTP referrers" from the Application Restrictions
14. in "Website Restrictions", select add an item
15. Provide the domain for your application e.g.:

```
myapp.herokuapp.com/*
```

16. Click "DONE"
17. Under "API RESTRICTIONS" at the bottom of the screen, click "Restrict Key"
18. In the "Select APIs", dropdown check the "Identity Toolkit API" and the "Cloud Storage API"
19. Click "Save"
20. On the admin panel at your production host (e.g., heroku), add two environment variables:

```
REACT_APP_FIREBASE_CONFIG=./firebaseConfig.json
FIREBASE_CONFIG=[the contents of your firebaseConfig.json but with the production API key]
```

21. Upon deployment, before the React app is built, a `firebaseConfig.json` file will be created in the `src` directory using the configuration in `FIREBASE_CONFIG`

## Access the profile post log in/sign in

The Firebase auth library has an `onAuthStateChanged` event that happens when a user signs in or out. This would be the best time to load the corresponding `firestore` entry for a user. I discovered that Firebase signs you in after sign up. This triggers an `auth.onAuthStateChanged` event before the firestore record is even created. To remedy this, in the `UserProvider` I have a one `useEffect` to handle the `onAuthStateChanged` event which sets the user state. I have another `useEffect` watching the user state and an `isSigningUp` variable. The profile will only be fetched if `isSigningUp` is false.

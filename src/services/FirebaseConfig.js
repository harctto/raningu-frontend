import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyANJJvFGIHxR3VEfqhxvpvdyrNT9l6Jr9s",
  authDomain: "raningu-95d67.firebaseapp.com",
  projectId: "raningu-95d67",
  storageBucket: "raningu-95d67.appspot.com",
  messagingSenderId: "836718238821",
  appId: "1:836718238821:web:4a145595bbd3d848613a8c",
  measurementId: "G-X4Q34NG336"
});

export const auth = firebase.auth();

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return { res: "success" };
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { res: "error", err: errorCode, errMsg: errorMessage };
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("signOut");
      window.alert("Sign out successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};

//google
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
GoogleAuthProvider.setCustomParameters({ prompt: "select_account" });
//facebook
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
FacebookAuthProvider.setCustomParameters({ prompt: "select_account" });
//github
const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
GithubAuthProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(GoogleAuthProvider);
export const signInWithFacebook = () => auth.signInWithPopup(FacebookAuthProvider);
export const singInWithGithub = () => auth.signInWithPopup(GithubAuthProvider);

export default firebaseConfig;

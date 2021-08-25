import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCzPc5yTwV7kwRWrQUqyGJjldP-AB-K9-Y",
    authDomain: "websitename-csc361.firebaseapp.com",
    projectId: "websitename-csc361",
    storageBucket: "websitename-csc361.appspot.com",
    messagingSenderId: "263414724563",
    appId: "1:263414724563:web:d74750a3c5ab43f2e46126",
    measurementId: "G-2MBXH53V8D"
});

export const auth = firebase.auth();

export const signOutHandle = () => {
    auth.signOut().then(() => {
        alert('Sign Out');
    }).catch((error) => {
        console.log(error)
    });
}

//google
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
GoogleAuthProvider.setCustomParameters({ prompt: "select_account" });
//facebook
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
FacebookAuthProvider.setCustomParameters({ prompt: "select_account" })
//github
const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
GithubAuthProvider.setCustomParameters({ prompt: "select_account"})

export const signInWithGoogle = () => auth.signInWithPopup(GoogleAuthProvider);
export const signInWithFacebook = () => auth.signInWithPopup(FacebookAuthProvider);
export const singInWithGithub = () => auth.signInWithPopup(GithubAuthProvider);

export default firebaseConfig;
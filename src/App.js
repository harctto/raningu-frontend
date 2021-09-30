// css
import './css/App.css';
//lib-import
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import firebase from './services/FirebaseConfig'
//components
// eslint-disable-next-line
import Signin from './contents/Signin'
// eslint-disable-next-line
import Signup from './contents/Signup'
import Home from './contents/Home'
import Lesson from './contents/Lesson';
import Quiz from './contents/Quiz';
import Canvas from './contents/Canvas';
import Stats from './contents/Stats';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  return (
    <Router>
        <Route exact path="/">
          <Signin user={user} />
        </Route>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home">
          {user ? <Home user={user} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/lesson">
          {user ? <Lesson user={user} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/quiz">
          {user ? <Quiz user={user} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/canvas">
          {user ? <Canvas user={user} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/stats">
          {user ? <Stats user={user} /> : <Redirect to="/" />}
        </Route>
    </Router>
  );
}

export default App;

// css
import './css/App.css';
//lib-import
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import firebase from './services/FirebaseConfig'
//components
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
    <Redirect from="/" to="/home" />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/home">
        <Home user={user} />
      </Route>
      <Route exact path="/lesson">
        <Lesson user={user} />
      </Route>
      <Route exact path="/quiz">
        <Quiz user={user} />
      </Route>
      <Route exact path="/canvas">
        <Canvas user={user} />
      </Route>
      <Route exact path="/stats">
        <Stats user={user} />
      </Route>
    </Router>
  );
}

export default App;

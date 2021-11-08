// css
import './css/App.css';
//lib-import
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import firebase from './services/FirebaseConfig'
//components
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
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/home">
          <Home user={user} />
        </Route>
        <Route path="/lesson">
          <Lesson user={user} />
        </Route>
        <Route path="/quiz">
          <Quiz user={user} />
        </Route>
        <Route path="/canvas">
          <Canvas user={user} />
        </Route>
        <Route path="/stats">
          <Stats user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

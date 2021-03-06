import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import VideoState from './context/video/VideoState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';
import VideoPlayer from './components/videos/VideoPlayer';

const App = () => {
  return (
    <AuthState>
      <VideoState>
        <AlertState>
          <Router>
            <Fragment>
              
              <div className="container">
                <Alerts/>
                <Switch>
                  <PrivateRoute exact path='/customize' component={Home} />
                  <PrivateRoute exact path="/about" component={About}></PrivateRoute>
                  <PrivateRoute exact path="/" component={VideoPlayer}></PrivateRoute>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/login" component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </VideoState>
    </AuthState>
  );
}

export default App;

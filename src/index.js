import css from './app.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import SignUp from './Sign_up';
import LogIn from './Log_in';
import Settings from './settings/Settings'

ReactDOM.render(
  <Router>
    <div>
      <Route path="/zxzx" component={LogIn}/>
      <Route path="/SignUp" component={SignUp}/>
      <Route exact path="/" component={Settings}/>
    </div>
  </Router>,
  document.getElementById('root')
);
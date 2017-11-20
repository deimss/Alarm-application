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

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={LogIn}/>
      <Route path="/SignUp" component={SignUp}/>
    </div>
  </Router>,
  document.getElementById('root')
);
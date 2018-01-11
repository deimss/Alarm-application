import css from './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import LogIn from './login/login';

ReactDOM.render(
  <HashRouter>
    <div>

      <Route exact path="/" component={LogIn} />
    </div>
  </HashRouter>,
  document.getElementById('root')
); 

// <Route exact path="/" component={MasterPage}/>
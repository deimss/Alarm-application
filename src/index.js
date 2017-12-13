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
import MasterPage from './components/masterPage/masterpage';
import SettingsPage from './settings/wearer-settings/wearers-configuration-page/wearerSettingsPage.js'

ReactDOM.render(
  <Router>
    <div>
      <Route path="/login" component={LogIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/settings" component={SettingsPage}/>
      <Route exact path="/" component={MasterPage}/>
    </div>
  </Router>,
  document.getElementById('root')
); 
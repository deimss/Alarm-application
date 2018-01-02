import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Header from '../header/header.js';
import SettingsNavbar from './wearer-navbar/navbar.js';
import WearerConfiguration from './wearer-configuration-page/wearerConfiguration.js';
import WristoConfiguration from './wristo-group-configuration/wristoGroupConfiguration.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WearersLoading extends React.Component{ 

  constructor(props) {
    super(props);
  };

render(){

    return (
         
      <div className="loader"></div>
        
        );
    }
}



export default WearersLoading;


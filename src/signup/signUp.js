import React from 'react';
// import logoImg from '../../assets/images/logoW.png';
import logo from '../assets/images/logo.png'
import SignUpForm from './signUpForm.js';
import classNames from 'classnames';
//import { Link } from 'react-router';
// import {
//   BrowserRouter as Router,
//    Redirect,
//   withRouter,  Link, browserHistory
// } from 'react-router-dom';
// import { Route, IndexRoute } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class SignUp extends React.Component{ 
    render(){
        return (
        <div className="sign_Page">
    <header>
        <div className="header__logo">
        <img src={logo} alt="" />
        <span> wristo </span>
        </div>
    </header>
    
    <div className="wrapUp">
        <div>
        <p id="heading">Sign up</p>
        </div>
        
       <SignUpForm/>
        
        <div className="sign">
            <p>
            <Link to='/'>Go back to log in</Link>    
            </p>
        </div>
    </div>    
</div>
        );
    }
}



export default SignUp;

// <a href="#">Go back to log in</a>
import React from 'react';
import ReactDOM from 'react-dom';
// import logoImg from '../../assets/images/logoW.png';
import logo from '../assets/images/logo.png'
import LogInForm from './loginForm.js';
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

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            forgetPasswordClicked: false,
            resendEmailClicked: false
        }
        this.toogleEmailInp = this.toogleEmailInp.bind(this);
        this.toogleResendEmailInp = this.toogleResendEmailInp.bind(this);
        this.toogleBackToLogin = this.toogleBackToLogin.bind(this);
    }

    toogleEmailInp(){
        this.setState({
            forgetPasswordClicked: !this.state.forgetPasswordClicked
        })
    }

    toogleResendEmailInp(){
        this.setState({
            resendEmailClicked: !this.state.resendEmailClicked
        })
    }

    toogleBackToLogin(){
        this.setState({
            resendEmailClicked: false,
            forgetPasswordClicked: false
        })  
    }

    render(){
        return (
    <div className="sign_Page">
    <header>
        <div className="header__logo">
        <img src={logo} alt=""/>
        <span> wristo </span>
        </div>
    </header> 
        <LogInForm toogleEmailInp ={this.toogleEmailInp} toogleResendEmailInp={this.toogleResendEmailInp}/>

    </div>

       

        );
    }
}

export default Login;

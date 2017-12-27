import React from 'react';
import ReactDOM from 'react-dom';
// import logoImg from '../../assets/images/logoW.png';
import logo from '../assets/images/logo.png'
import LogInForm from './loginForm.js';
import Email from './email.js';
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
            forgetPasswordClicked: false
        }
        this.toogleEmailInp = this.toogleEmailInp.bind(this);
    }

    toogleEmailInp(){
        this.setState({
            forgetPasswordClicked: !this.state.forgetPasswordClicked
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
    {this.state.forgetPasswordClicked ? <div className="wrap">
    <p id="heading">Reset</p>
        <Email toogleEmailInp ={this.toogleEmailInp}/></div> : <div className="wrap">
        <div>
        <p id="heading">Log in</p>
        </div>
        
        <LogInForm toogleEmailInp ={this.toogleEmailInp}/>

        <div className="sign">
            <p>Don't have an account? 
                <Link to='/signup'>Create account</Link>
            </p>
        </div>
    </div> }
       
</div>
        );
    }
}

export default Login;

// <a href="../html/Sign_up_page_Responsive.html"> Create account</a>
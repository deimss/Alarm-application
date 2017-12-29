import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
//import MasterPage from '../../components/masterPage/masterpage';

export const master = {
    client: sessionStorage.getItem("client"),
    accesstoken: sessionStorage.getItem("accesstoken"),
    uid: sessionStorage.getItem("uid")
}


class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    
    this.saveInput = this.saveInput.bind(this);
    this.sendData = this.sendData.bind(this);

    
    this.state = {
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passError: false,
      isShowed: false,
      textValue:'Show',
      passwordType: 'password',
      isSendData: false,
      testError: false,
      loginError: false,
      accesstoken: null, 
      client: null,
      uid: null,
      isAuthenticated: false,
      redirectToMaster: false
   };
  }

  componentWillMount(){
    console.log('MASTERrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',master)
    if(sessionStorage.getItem("client") !== null && sessionStorage.getItem("accesstoken") !== null && sessionStorage.getItem("uid") !== null ){
      this.setState({
        redirectToMaster: true
      })
    }
  }

  saveInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({loginError: false});
    if(name =='email') {
      this.setState({email: value});
      console.log("email success");
    }else if(name =='password') {
      this.setState({password: value});
      console.log("password success");
    };
 };
  
 isAuthenticated(){
   if(this.state.client !== null && this.state.accesstoken !== null  && this.state.uid !== null ){
     this.setState({isAuthenticated: true})
   }else {
    this.setState({isAuthenticated: false})
   }
 }
  
  sendData(event){
    this.setState({
    isSendData: true
    
    });
    console.log('MASTER',master)
    var errorStatus = false;
    event.preventDefault();
    axios({
            method: 'post',
            url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_in',
            data: {
                email: this.state.email,
                password: this.state.password,
            }

}).then(response => {
    console.log('loginForm response headers', response.headers['access-token'],response.headers.client,response.headers.uid);
  if(response.status === 200){
    sessionStorage.setItem('client', response.headers.client);
    sessionStorage.setItem('accesstoken', response.headers['access-token']);
    sessionStorage.setItem('uid', response.headers.uid);
    this.setState({
      isAuthenticated: true,
      accesstoken: response.headers['access-token'],
      uid: response.headers.uid,
      client: response.headers.client
    })
  }else {
    this.setState({
      isAuthenticated: false
    })
  }
  console.log('MASTER',master)  
  })
  .catch((error) => { 
    this.setState({
      loginError: true,
      isAuthenticated: false
    });
    console.log(error);

  });
};

  render() {
    console.log('Login this.state.accessToken', this.state.accesstoken);
    console.log('Login this.state.client', this.state.client);
    console.log('Login this.state.uid', this.state.uid);

    let firstNameStyle = classNames({
      'inputField': (this.state.firstNameError) || (this.state.firstName == null && this.state.isSendData) 
    }); 

    let lastNameStyle = classNames({
      'inputField': (this.state.lastNameError) || (this.state.lastName == null && this.state.isSendData)
    }); 
    let emailStyle = classNames({
      'inputField': (this.state.emailError) || (this.state.email == null && this.state.isSendData)
    }); 
    let passwordStyle = classNames({
      'inputField': (this.state.passError) || (this.state.password == null && this.state.isSendData)
    });

    return (
      <div>
        {this.state.isAuthenticated || this.state.redirectToMaster ?  <Redirect master={master} to={{
        pathname: '/masterpage'
      }}/> :  <form className="signInForm">
      <p>Email</p>
      <input className={emailStyle} classnames="email" name="email" type="text" placeholder="user@mail.com" onChange={this.saveInput} />
      
      <p>Password</p>
          <input className={passwordStyle} classnames="password" name="password" type="password" placeholder="Enter your password" onChange={this.saveInput} />
          {this.state.loginError && <div className="login-error">
              <svg fill="#b52f54" height="13" viewBox="0 0 23 23" width="13" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              <span> Invalid login or password. Please try again. </span>
          </div>}
          <p id="forgotPass1" onClick={() => this.props.toogleEmailInp()}><a href="#"> Forgot password?</a></p>
          <p id="forgotPass2" onClick={() => this.props.toogleResendEmailInp()}><a href="#"> Recend confirmation email</a></p>
          
          <input className="submit" type="button" value="Sign in" onClick={this.sendData}/>
          
      </form> 
      }       
      </div>
    );
  }
}


export default LogInForm;
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
import logo from '../assets/images/logo.png';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.sendData = this.sendData.bind(this);
   // this.handleTooglePass = this.handleTooglePass.bind(this);
    
    this.state = {
      passError1: false,
      passError2: false,
      isShowed: false,
      textValue:'Show',
      passwordType: 'password',
      isSendData: false,
      testError: false,
      isRegistrationed: false
    };
  }

  handlePassInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log('Event  !!!! --------- ', name)
    this.setState({isSendData: false});
    this.setState({
      [name]: value
    });

    let passFilter = /^([A-Za-z\d$@$!%*?&\S]){8,16}$/;
    let passInput;
    if(name === 'password1'){
      passInput = this.state.password1
    }else {
      passInput = this.state.password2
    }

    if (!passFilter.test(passInput) && name === 'password1') {
        this.setState({passError1: true});
    }
    else if (!passFilter.test(passInput) && name === 'password2') {
        this.setState({passError2: true});
    }else if(passFilter.test(passInput) && name === 'password1'){
      this.setState({passError1: false});
    }else{
      this.setState({passError2: false});
    }
  };

  saveInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(name=='password1') {
      this.setState({password1: value});
      console.log("firstname success");
    }else if(name=='password2') {
      this.setState({password2: value});
      console.log("password success");
    };
 };

getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
  
  
  sendData(event){
    const master = {
      accesstoken: this.getUrlVars()["token"],
      client: this.getUrlVars()["client_id"],
      uid: this.getUrlVars()["uid"].replace("%40","@")

    }
    const accesstoken = this.getUrlVars()["token"];
    const client = this.getUrlVars()["client_id"];
    const uid = this.getUrlVars()["uid"];
    console.log('Master obj',master);
    this.setState({isSendData: true});
    event.preventDefault();
    axios({
            method: 'post',
            url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/password',
            headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
            'uid': this.state, 'client': this.state.client, 'access-token': this.state.accesstoken},
            data: {
                password: this.state.password1,
                password_confirmation: this.state.password2
            }
}).then(response => {
    console.log(response);
    if(response.status === 200){
      this.setState({
        isRegistrationed: true
      })
    }else {
      this.setState({
        isRegistrationed: false
      })
    }
    //this.setState({isSendData: true});
  })
  .catch(function (error) {
    console.log(error);
    //this.setState({isSendData: true});
  });
};

// testFunction(e) {
//   console.log(e.target.value)
//   console.log(this.refs.test.value)
//   this.setState({
//     testError: true
//   })
// }


  render() {


    let passwordStyle1 = classNames({
      'inputField': (this.state.passError1) || (this.state.password1 == null && this.state.isSendData)
    });
    let passwordStyle2 = classNames({
      'inputField': (this.state.passError2) || (this.state.password2 == null && this.state.isSendData)
    });

    // const testClass = classNames({
    //   'test': true,
    //   'test-error': this.state.testError
    // })

    return (
      <div>
      <div className="sign_Page">
      <header>
        <div className="header__logo">
        <img src={logo} alt=""/>
        <span> wristo </span>
        </div>
      </header>
      <div className="wrap">
      <div>
        <p className='headers-update-password'>Update password</p>
        </div>
        <form className="signUpForm">
        <div>        
        <p>New Password <span>*</span></p>
            <input className={passwordStyle1} classnames="password1" name="password1" type={ this.state.passwordType } placeholder="Enter new password" onBlur={this.handlePassInput} onChange={this.saveInput}/>            
            {(this.state.passError1 || (this.state.password1 == null && this.state.isSendData)) && <div className="error">
                <svg fill="#b52f54" height="13" viewBox="0 0 23 23" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                <span> The password must be between 8 and 16 characters </span>
            </div>}
        </div>
        <div>        
        <p>Confirm Password <span>*</span></p>
            <input className={passwordStyle2} classnames="password2" name="password2" type={ this.state.passwordType } placeholder="Confirm password" onBlur={this.handlePassInput} onChange={this.saveInput}/>
            {(this.state.passError2 || (this.state.password2 == null && this.state.isSendData)) && <div className="error">
                <svg fill="#b52f54" height="13" viewBox="0 0 23 23" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                <span> The password must be between 8 and 16 characters </span>
            </div>}
          </div>
            <input className="submit" type="button" value="Submit" onClick={this.sendData}/>
            {!(this.state.password1 === this.state.password2) && <div className="errorPasswordConfirm">
                <svg fill="#b52f54" height="13" viewBox="0 0 23 23" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                <span> Passwords do not match </span>
            </div>}
        </form>
        </div>
      </div>
    </div>
    );
  }
}


export default ResetPassword;
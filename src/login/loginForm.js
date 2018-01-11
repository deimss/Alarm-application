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

export const master = {
    client: sessionStorage.getItem("client"),
    accesstoken: sessionStorage.getItem("accesstoken"),
    uid: sessionStorage.getItem("uid")
}


class LogInForm extends React.Component {
  constructor(props) {
    super(props);

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
    axios({
      method: 'post',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_in',
      data: {
          email: 'boretskairuna23@gmail.com',
          password: 'somestring',
      }

    }).then(response => {   
    if(response.status === 200){
    sessionStorage.setItem('client', response.headers.client);
    sessionStorage.setItem('accesstoken', response.headers['access-token']);
    sessionStorage.setItem('uid', response.headers.uid);
    }
  }).catch((error) => { 
    console.log(error)
    });
  
  }

  sendData(event){
    this.setState({
    isSendData: true  
    });
    var errorStatus = false;
    event.preventDefault();
    axios({
            method: 'post',
            url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/notifications',
            headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
            'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
            data: {
              notification: {
              "message": "SDAFASFASF",
              "latitude": 75,
              "longitude": 75
            }
          }
}).then(response => {
    console.log(response)
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
        
          <input className="submit" type="submit" value="Alert" onClick={this.sendData}/>
          
           
      </div>
    );
  }
}


export default LogInForm;
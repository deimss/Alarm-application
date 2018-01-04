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
import Modal from "react-responsive-modal";


// export const master = {
//     client: null,
//     accesstoken: null,
//     uid: null
// }


class Email extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onOpenModal =this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
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
      isSendMail: false,
      open: false
    };
  }

  onOpenModal(){
    this.setState({ open: true });
  };

  onCloseModal(){
    this.setState({ open: false });
  };

  handleEmailInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({isSendData: false});
    this.setState({
      [name]: value
    });

    let emailFilter = /^([a-zA-Z0-9_\.\-]{1,4})+\@(([a-zA-Z0-9\-]{1,4})+\.)+([a-zA-Z0-9]{1,5})+$/;
    let emailInput = this.state.email;
    if (!emailFilter.test(emailInput)) {
        this.setState({emailError: true});
    }
    else {
        this.setState({emailError: false});
    }
  };

  saveInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(name=='firstName') {
      this.setState({firstName: value});
      console.log("firstname success");
    } else if(name=='lastName') {
      this.setState({lastName: value});
      console.log("lastname success");
    } else if(name=='email') {
      this.setState({email: value});
      console.log("email success");
    }else if(name=='password') {
      this.setState({password: value});
      console.log("password success");
    };
 };
 
  
 sendEmail(event){
    this.setState({isSendData: true});
    event.preventDefault();
    if(this.props.stateforgetPasswordClicked){
      axios({
        method: 'post',
        url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/password',
        data: {
            email: this.state.email,       
          }
    }).then(response => {
    console.log(response);
    if(response.status === 200){
      this.setState({
        open: true,
        isSendMail: true
      })
    }else {
      this.setState({
        emailError: true
      })
    }
    //this.setState({isSendData: true});
    })
    .catch(error => {
    console.log(error);
    this.setState({
      emailError: true
    })
    //this.setState({isSendData: true});
    });
    }else {
      axios({
        method: 'post',
        url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/confirmation',
        data: {
            email: this.state.email,       
          }
    }).then(response => {
    console.log(response);
    if(response.status === 200){
      this.setState({
        open: true,
        isSendMail: true
      })
    }else {
      this.setState({
        emailError: true
      })
    }
    })
    .catch(error =>{
    console.log(error);
    this.setState({
      emailError: true
    })
    }); 
    }  
};


  render() {

    const { open } = this.state;

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
          <form className="signUpForm">
          <div className="wrap">{this.props.stateforgetPasswordClicked ? <p id="headers-update-password">Reset password</p> : <p id="headers-update-password">Confirm email</p>}
          </div>
            <p>Enter your Email <span>*</span>
            </p>
            <input className={emailStyle} classnames="email" name="email" type="text" placeholder="nancy.mcqueen@mail.com" onBlur={this.handleEmailInput} onChange={this.saveInput}/>
            {(this.state.emailError || (this.state.email == null && this.state.isSendData)) && <div className="error">
                <svg fill="#b52f54" height="13" viewBox="0 0 23 23" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                <span> Please provide a valid email address </span>
            </div>}            
            <input className="submit" type="submit" value="Send a mail" onClick={this.sendEmail}/>
            <div className="sign">
              <p>
              <a className='hoverForReset' onClick ={() => this.props.toogleBackToLogin()}> Go back to log in</a>
              <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Check your mailbox, please!</h2>
          
        </Modal>
              </p>
            </div>
          </form>  
      </div>
    );
  }
}


export default Email;
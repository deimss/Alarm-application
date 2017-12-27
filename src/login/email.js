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


export const master = {
    client: null,
    accesstoken: null,
    uid: null
}


class Email extends React.Component {
  constructor(props) {
    super(props);

    this.handlefirstNameInput = this.handlefirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleTooglePass = this.handleTooglePass.bind(this);
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
      isRegistrationed: false,
      open: false
      //divStyle: null

      //{outline: 5px solid #b52f54;}
    };
  }

// var classnames = classNames(
//   'foo', 
//   'bar'
//   );
   
onOpenModal(){
  this.setState({ open: true });
};

onCloseModal(){
  this.setState({ open: false });
};

handleTooglePass(event){
  event.preventDefault();
  let isShowed = this.state.isShowed;
  let target = event.target;
  const name = target.name;
  let textValue = target.textValue;
  
    if (isShowed) {
      console.log('false');
      console.log(textValue);
      this.setState ({isShowed: false});
      event.target.textValue =  "Show";
      this.setState ({passwordType: 'password'});
    } 

    else {
      console.log('true');
      console.log(event.target.textValue);
      this.setState({isShowed: true});
      event.target.textValue = "Hide";
      this.setState ({passwordType: 'text'});
    }

    this.setState({textValue : event.target.textValue});
    return this.state.textValue;

  };

handlefirstNameInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({isSendData: false});
    this.setState({
      [name]: value
    });

    let firstNameFilter = /^([A-Za-z]){2,30}$/;
    let firstNameInput = this.state.firstName;
    if (!firstNameFilter.test(firstNameInput)) {
        this.setState({firstNameError: true});
        // this.setState(divStyle: {
        //         outlineWidth: 5,
        //         outlineStyle: 'solid',
        //         outlineColor: '#b52f54' 
        // });
    //     inputStyle= {
    //             outlineWidth: 5,
    //             outlineStyle: 'solid',
    //             outlineColor: '#b52f54' 
    //     };
    //console.log(this.state.divStyle);
    }
    else {
        this.setState({firstNameError: false});
    }
  };

handleLastNameInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({isSendData: false});
    this.setState({
      [name]: value
    });

    let lastNameFilter = /^([A-Za-z]){2,30}$/;
    let lastNameInput = this.state.lastName;
    if (!lastNameFilter.test(lastNameInput)) {
        this.setState({lastNameError: true});
        // this.setState(divStyle: {
        //         outlineWidth: 5,
        //         outlineStyle: 'solid',
        //         outlineColor: '#b52f54' 
        // });
        
    }
    else {
        this.setState({lastNameError: false});
        //target.styles={outline: 5px solid #b52f54};
    }
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

  handlePassInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({isSendData: false});
    this.setState({
      [name]: value
    });

    let passFilter = /^([A-Za-z\d$@$!%*?&\S]){8,16}$/;
    let passInput = this.state.password;
    if (!passFilter.test(passInput)) {
        this.setState({passError: true});
    }
    else {
        this.setState({passError: false});
    }
  };

  

// style={{marginRight: spacing + 'em'}}

//   handleInputStyle(event){
//       this.setState(divStyle: {
//       outlineWidth: 5,
//       outlineStyle: 'solid',
//       outlineColor: '#b52f54'


//       // 'outline-width': '5px',
//       // 'outline-style': 'solid',
//       // 'outline-color': '#b52f54'
// }); 
//       return this.state.divStyle;

//   }

  


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

  
  
  sendData(event){
    this.setState({isSendData: true});
    event.preventDefault();
    axios({
            method: 'post',
            url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_up',
            data: {
              user: {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password
              }
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

    // const testClass = classNames({
    //   'test': true,
    //   'test-error': this.state.testError
    // })

    return (
      <div>
          <form className="signUpForm">
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
            <input className="submit" type="button" value="Send a mail" onClick={this.onOpenModal}/>
            <div className="sign">
              <p>
              <a className='hoverForReset' onClick ={() => this.props.toogleEmailInp()}> Go back to log in</a>
              <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Check your email, please!</h2>
        </Modal>
              </p>
            </div>
          </form>  
      </div>
    );
  }
}


export default Email;
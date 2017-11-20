import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFirstName: '',
      valueLastName: '',
      valueEmail: '',
      valuePassword: '',
      showErrorFirstName: false,
      showErrorLastName: false,
      showErrorEmail: false,
      showErrorEmailAlready: false,
      showErrorPassword: false,
      stateButton: 'Show',
      statePasswordInp: 'password'

  };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showHideButton = this.showHideButton.bind(this);
    this.validateEmailFIeld = this.validateEmailFIeld.bind(this);
    this.validatePasswordField = this.validatePasswordField.bind(this);
    this.validateFirstNameField = this.validateFirstNameField.bind(this);
    this.validateLastNameField = this.validateLastNameField.bind(this);
    this.addBorderForError = this.addBorderForError.bind(this);
  }

  addBorderForError(block,stateEvent){
    if(stateEvent === true){
      block.style.border = '2px solid #b52f54';
    }else {
      block.style.border = 'none';
    }

  }

  showHideButton() {
    let statePasswordInp;
    let stateButton;
    if (this.state.stateButton === 'Show'){
      statePasswordInp = 'text';
      stateButton = 'Hide';
    }else {
      statePasswordInp = 'password';
      stateButton = 'Show';
    } 
    this.setState({
      statePasswordInp: statePasswordInp,
      stateButton: stateButton
    }); 
  }

  validateFirstNameField(event){
    let showErrorFirstName;
    let regName = /^([a-zA-Z]){2,30}$/g;
    if (this.state.valueFirstName.match(regName) !== 0 && this.state.valueFirstName.match(regName) || this.state.valueFirstName.length === 0 ){
      showErrorFirstName = false;
    }else {
      showErrorFirstName = true;
    }
    this.addBorderForError(event.target,showErrorFirstName);
    this.setState({
      showErrorFirstName: showErrorFirstName
    }); 
  }

  handleChangeFirstName(event) {
    this.setState({valueFirstName: event.target.value});
  }

  validateLastNameField(event){
    let showErrorLastName;
    let regName = /^([a-zA-Z]){2,30}$/g;
    if (this.state.valueLastName.match(regName) !== 0 && this.state.valueLastName.match(regName) || this.state.valueLastName.length === 0){
      showErrorLastName = false;
    }else {
      showErrorLastName = true;
    }
    this.addBorderForError(event.target,showErrorLastName);
    this.setState({
      showErrorLastName: showErrorLastName
    }); 
  }

  handleChangeLastName(event) {
    this.setState({valueLastName: event.target.value});
  }

  validateEmailFIeld(event){
    let showErrorEmail;
    let regEmail = /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[A-Za-z]{2,6}$/g;
    if (this.state.valueEmail.match(regEmail) !== 0 && this.state.valueEmail.match(regEmail) !== null || this.state.valueEmail.length === 0 ){
      showErrorEmail = false;
    }else {
      showErrorEmail = true;
    }
    this.addBorderForError(event.target,showErrorEmail)
    this.setState({
      showErrorEmail: showErrorEmail,
      showErrorEmailAlready: false
    });
  }

  handleChangeEmail(event) {
    this.setState({valueEmail: event.target.value,});
   }
 
  validatePasswordField(event){
    let showErrorPassword;
    if (this.state.valuePassword.length >= 8 && this.state.valuePassword.length <= 16 || this.state.valuePassword.length === 0 ){
      showErrorPassword = false;
    }else {
      showErrorPassword = true;
    }  
    this.addBorderForError(event.target, showErrorPassword)
    this.setState({showErrorPassword: showErrorPassword});
  }

  handleChangePassword(event) {
     this.setState({valuePassword: event.target.value});
   }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.showErrorFirstName === false && this.state.valueFirstName.length !== 0 && this.state.showErrorLastName === false && this.state.valueLastName.length !== 0 && this.state.showErrorEmail === false && this.state.valueEmail.length !== 0 && this.state.showErrorPassword === false && this.state.valuePassword.lenght !== 0 ){
      let self = this;
      axios({
        method: 'post',
        url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_up',
        data:{
          user:{
            first_name: this.state.valueFirstName,
            last_name: this.state.valueLastName,
            email: this.state.valueEmail,
            password: this.state.valuePassword
          }
        } 
      })
      .then(function (response) {
        alert('Welcome');
      })
      .catch(function (error) {
        if( self.state.valueEmail.length != 0){
        self.setState({showErrorEmailAlready: true})
        self.addBorderForError(self.emailInput,!(self.state.showErrorEmail))
        }else {
          self.setState({showErrorEmailAlready: false})
        }
      }
      );
        
    }else {
      if(this.state.valueFirstName.length === 0 && this.state.showErrorFirstName === false){this.addBorderForError(this.firstNameInput,!(this.state.showErrorFirstName));
        this.setState({showErrorFirstName: true})}
      if(this.state.valueLastName.length === 0 && this.state.showErrorLastName === false){this.addBorderForError(this.lastNameInput,!(this.state.showErrorLastName));
        this.setState({showErrorLastName: true})}
      if(this.state.valueEmail.length === 0 && this.state.showErrorEmail === false){this.addBorderForError(this.emailInput,!(this.state.showErrorEmail));
        this.setState({showErrorEmail: true})}
      if(this.state.valuePassword.length === 0 && this.state.showErrorPassword === false){this.addBorderForError(this.passwordInput,!(this.state.showErrorPassword));
        this.setState({showErrorPassword: true})
    }
  }
}

  render() {
    return (
        <div className="container">
          <div className="singup-logo-container">
              <div className="logo"><a href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABDCAMAAAB5oB1tAAAAM1BMVEUAAAC1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1TucyQIAAAAEHRSTlMAENBgMKDwQIDA4HBQsCCQwCL6LwAAAsFJREFUaN6810FugzAQBVDAEAwk1Pc/bYVUOosnbNqqmRVRvjwPhMei+3E987Y3QylvfXul6dn9raZSyiPVM/1whMZ6aFxLKetlqH8ty6tvWo5KLQsaLA9CrjH0DcuwJzSsM/QTjbAM8xAh10Cj5fgbjZauQ4OlP7IR0qJGS6dGixotXWi0oLmwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGi0qNGiRosaLWq0qNGiRosaLWpy/FAzC1ZzHq1rhNCsR6PLms/oGiuoeX0tV51PH1/ndImQmnQHM1eGfynLN2tuhqZiKJpM73gy6fvJpPqTecM7k+6+M2/YTen2bvr/OZNuz5nmBB5zzn1rAj9z3rrQaIkQmsp5gOVxXIcGy3lRptBoiVBotKjRokaLGi1osKDBokaLGi1osKDRokaLGi1qsKDRokaLGi1qsKDRokaLGi1qwnKhwYJmT1rUbFjQ8N3EFyUWNEWLmqJFTdFihUXNRyllPS1XmuUIjfXQuP7YombfnudeuWzU7Xluh9KUut9amGeVRu3Q3Tot1itC5bK2uKtaqFHtPosh67MdO1hhEIbBACyzsyvIfP+33Uly+NAeQg7CclL5ST5Qaukndm83oUdiXpctjghtude03wFY/WafXdsyH/A6RahxjBpDaBIWNIxBQwgNlpzmHd35fxmKy4QFjWPQGOIGS0JDZzSG1IQloaEvGkI8SFhCQ1c0huSlLKGxpxpDasKS0NhRjSE1YcloHKPGkJrTktH03qPbheZrSE3rvS3pYgwaQ2qsvEUNoXLNzgA0WIo0k1PIs8Z16I8pxLgWW2/3N9a6FGm0qNFSo9GiRkuVRosaLVUaLWq0VGm0qNFSpdGiRkuVRosaLVUaLWq0VGm0qNFSoNGipsziKeQxC7Uxxro8u359+Lsavi3kNgAAAABJRU5ErkJggg==
                " width="47" height="22" />
                </a>
              </div> 
              <span>WRISTO</span>       
          </div>
          <p className="Sign-up">Sign up</p>
            <form>
              <div className="ipField">
                <label><p className="p-pad">First name<span className="pink">&nbsp;*</span></p>
                <input type="text"  ref={(input) => { this.firstNameInput = input; }} value={this.state.valueFirstName} onChange={this.handleChangeFirstName} onBlur={this.validateFirstNameField} placeholder="Nancy" className="firstinp" required /></label>
              </div>
              {this.state.showErrorFirstName && <div className="error-email"><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg><span>This field should contain from 2 to 30 letters</span></div>}
              <div className="ipField">
                  <label><p className="p-pad">Last name<span className="pink">&nbsp;*</span></p>
                  <input type="text"  ref={(input) => { this.lastNameInput = input; }} value={this.state.valueLastName} onBlur={this.validateLastNameField} onChange={this.handleChangeLastName} placeholder="McQueen" className="secondinp" required /></label>
              </div>
              {this.state.showErrorLastName && <div className="error-email"><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg><span>This field should contain from 2 to 30 letters</span></div>}
              <div className="ipField">
                  <label><p className="p-pad">Email<span className="pink">&nbsp;*</span></p>
                  <input type="email"  ref={(input) => { this.emailInput = input; }} value={this.state.valueEmail} onBlur={this.validateEmailFIeld} onChange={this.handleChangeEmail} placeholder="nancymcqueen@mail.com" className="thirdinp" maxLength="129" required /></label>
              </div>
              {this.state.showErrorEmail && <div className="error-email"><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg><span>Please provide a valid email address</span></div>}
              {this.state.showErrorEmailAlready && <div className="error-email"><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg><span>User already exists</span></div>}
              <div className="ipField pos" >
                  <label><p className="p-pad">Password<span className="pink">&nbsp;*</span></p>
                  <input type={this.state.statePasswordInp}  ref={(input) => { this.passwordInput = input; }} value={this.state.valuePassword} onBlur={this.validatePasswordField} onChange={this.handleChangePassword} placeholder="Enter your password"  className="fourthinp" required />
                  <input type="button" value={this.state.stateButton} className="pink buttonShowHide" onClick={this.showHideButton}/></label>
              </div>
              {this.state.showErrorPassword && <div className="error-password" ><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg><span>The password must be between 8 and 16 characters</span></div>}
              <input type="submit" value="Create account" onClick={this.handleSubmit}></input>
            </form>
          <p className="Dont-have-an-accoun"><Link to="/" className="pink">Go back to log in</Link></p>
        </div>
      );
  }
}

export default SignUp;
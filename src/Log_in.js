import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueEmail: '',
      valuePassword: '',
      emailError: false
  };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({
      valueEmail: event.target.value,
      emailError: false
    });
  }

  handleChangePassword(event) { 
    this.setState({
      valuePassword: event.target.value,
      emailError: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    axios({
      method: 'post',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_in',
      data: {
        email: this.state.valueEmail,
        password: this.state.valuePassword
      }
    })
    .then(function (response) {
      self.setState({
        emailError: false,
      });
      console.log("Sucsses");
    })
    .catch(function (error) {
      self.setState({
        emailError: true,
      });
    });
  }

  render() {
    return (
          <div className="container">
            <div className="logo-container">
              <div className="logo"><a href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABDCAMAAAB5oB1tAAAAM1BMVEUAAAC1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1TucyQIAAAAEHRSTlMAENBgMKDwQIDA4HBQsCCQwCL6LwAAAsFJREFUaN6810FugzAQBVDAEAwk1Pc/bYVUOosnbNqqmRVRvjwPhMei+3E987Y3QylvfXul6dn9raZSyiPVM/1whMZ6aFxLKetlqH8ty6tvWo5KLQsaLA9CrjH0DcuwJzSsM/QTjbAM8xAh10Cj5fgbjZauQ4OlP7IR0qJGS6dGixotXWi0oLmwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGi0qNGiRosaLWq0qNGiRosaLWpy/FAzC1ZzHq1rhNCsR6PLms/oGiuoeX0tV51PH1/ndImQmnQHM1eGfynLN2tuhqZiKJpM73gy6fvJpPqTecM7k+6+M2/YTen2bvr/OZNuz5nmBB5zzn1rAj9z3rrQaIkQmsp5gOVxXIcGy3lRptBoiVBotKjRokaLGi1osKDBokaLGi1osKDRokaLGi1qsKDRokaLGi1qsKDRokaLGi1qwnKhwYJmT1rUbFjQ8N3EFyUWNEWLmqJFTdFihUXNRyllPS1XmuUIjfXQuP7YombfnudeuWzU7Xluh9KUut9amGeVRu3Q3Tot1itC5bK2uKtaqFHtPosh67MdO1hhEIbBACyzsyvIfP+33Uly+NAeQg7CclL5ST5Qaukndm83oUdiXpctjghtude03wFY/WafXdsyH/A6RahxjBpDaBIWNIxBQwgNlpzmHd35fxmKy4QFjWPQGOIGS0JDZzSG1IQloaEvGkI8SFhCQ1c0huSlLKGxpxpDasKS0NhRjSE1YcloHKPGkJrTktH03qPbheZrSE3rvS3pYgwaQ2qsvEUNoXLNzgA0WIo0k1PIs8Z16I8pxLgWW2/3N9a6FGm0qNFSo9GiRkuVRosaLVUaLWq0VGm0qNFSpdGiRkuVRosaLVUaLWq0VGm0qNFSoNGipsziKeQxC7Uxxro8u359+Lsavi3kNgAAAABJRU5ErkJggg==
                " width="47" height="22" alt=""/>
                </a>
              </div> 
              <span>WRISTO</span>       
            </div>
            <p className="Log-in">Log in</p>
            <form>
              <label><p className="Email">Email</p>
              <input type="email" value={this.state.valueEmail} onChange={this.handleChangeEmail} placeholder="user@mail.com" className="firstinp" required /></label>
              <label><p className="Password">Password</p>
              <input type="password" value={this.state.valuePassword} onChange={this.handleChangePassword} placeholder="Enter your password" value={this.state.value} className="secondtinp" required /></label> 
              {this.state.emailError &&  <div className="error-email-password" ><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" >
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                 </svg><span>Invalid login or password. Please try again</span></div> }
              <p className="Forgot-pas"><a href="#" className="pink">Forgot password?</a></p>
              <input type="submit"  onClick={this.handleSubmit} value="Sing in"></input>
            </form>
            <p className="Dont-have-an-accoun">Don’t have an account?<Link to="/SignUp" className="pink">&nbsp;Create account</Link></p>
            <p><Link to='/List'>Test LIst</Link></p>
          </div>
    );
  }
}

export default LogIn;
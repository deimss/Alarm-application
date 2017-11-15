import React from 'react';
import ReactDOM from 'react-dom';

const LogIn = () => {
  return <div className="container">
            <div className="logo-container">
              <div className="logo"><a href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABDCAMAAAB5oB1tAAAAM1BMVEUAAAC1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1S1L1TucyQIAAAAEHRSTlMAENBgMKDwQIDA4HBQsCCQwCL6LwAAAsFJREFUaN6810FugzAQBVDAEAwk1Pc/bYVUOosnbNqqmRVRvjwPhMei+3E987Y3QylvfXul6dn9raZSyiPVM/1whMZ6aFxLKetlqH8ty6tvWo5KLQsaLA9CrjH0DcuwJzSsM/QTjbAM8xAh10Cj5fgbjZauQ4OlP7IR0qJGS6dGixotXWi0oLmwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGiwqNGiRgsaLGi0qNGiRosaLWq0qNGiRosaLWpy/FAzC1ZzHq1rhNCsR6PLms/oGiuoeX0tV51PH1/ndImQmnQHM1eGfynLN2tuhqZiKJpM73gy6fvJpPqTecM7k+6+M2/YTen2bvr/OZNuz5nmBB5zzn1rAj9z3rrQaIkQmsp5gOVxXIcGy3lRptBoiVBotKjRokaLGi1osKDBokaLGi1osKDRokaLGi1qsKDRokaLGi1qsKDRokaLGi1qwnKhwYJmT1rUbFjQ8N3EFyUWNEWLmqJFTdFihUXNRyllPS1XmuUIjfXQuP7YombfnudeuWzU7Xluh9KUut9amGeVRu3Q3Tot1itC5bK2uKtaqFHtPosh67MdO1hhEIbBACyzsyvIfP+33Uly+NAeQg7CclL5ST5Qaukndm83oUdiXpctjghtude03wFY/WafXdsyH/A6RahxjBpDaBIWNIxBQwgNlpzmHd35fxmKy4QFjWPQGOIGS0JDZzSG1IQloaEvGkI8SFhCQ1c0huSlLKGxpxpDasKS0NhRjSE1YcloHKPGkJrTktH03qPbheZrSE3rvS3pYgwaQ2qsvEUNoXLNzgA0WIo0k1PIs8Z16I8pxLgWW2/3N9a6FGm0qNFSo9GiRkuVRosaLVUaLWq0VGm0qNFSpdGiRkuVRosaLVUaLWq0VGm0qNFSoNGipsziKeQxC7Uxxro8u359+Lsavi3kNgAAAABJRU5ErkJggg==
                " width="47" height="22" alt=""/>
                </a>
              </div> 
              <span>WRISTO</span>       
            </div>
            <p className="Log-in">Log in</p>
            <form>
              <p className="Email"><label htmlFor="firstinp">Email</label></p>
              <input type="email" placeholder="user@mail.com" className="firstinp" required />
              <p className="Password"><label htmlFor="secondtinp">Password</label></p>
              <input type="password" placeholder="Enter your password" className="secondtinp" required />
              <div className="error-email-password" hidden='true'><svg fill="#b52f54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg><span>Invalid login or password. Please try again</span>
              </div>
              <p className="Forgot-pas"><a href="#" className="pink">Forgot password?</a></p>
              <input type="submit" value="Sing in"></input>
            </form>
            <p className="Dont-have-an-accoun">Don’t have an account?<a href="Signup.html" className="pink">&nbsp;Create account</a></p>
          </div>
}

export default LogIn;
import React from 'react';
import ReactDOM from 'react-dom';
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

class NotFound extends React.Component{
    render(){
        return (
            <div>
                <h1> 404 </h1>
                <h2> Not Found </h2>
                <p> <Link to='/'>Return to the home page</Link> </p>
            </div>
        );
    }
}

export default NotFound;
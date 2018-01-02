import React from 'react';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class ManageProfileButtons extends React.Component{ 


 render(){

        return (
            <div className="profile-buttons-container">
              <button className="delete-wearer-data"> <span> DELETE </span> </button>
              <button className="save-wearer-data"> <span> SAVE </span> </button> 
            </div>
        );
    }
}



export default ManageProfileButtons;
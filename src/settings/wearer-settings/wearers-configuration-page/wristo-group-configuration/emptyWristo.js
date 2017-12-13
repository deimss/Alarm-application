import React from 'react';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class AddWristo extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      addNewWristo: false
     };
  };


   
    render(){

        return ( 
        <div className="add-wristo-wrap">
            <p className="add-wristo-button-description">Click to add wristo</p>
              <button className="add-wristo-button" onClick={this.props.handleAddNewWristo}>
                    <svg className="add-wristo-button__icon" fill="#B52F54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="addWristoDetails__name">Add Wristo Details</span>
              </button>
          </div>

        )
    }
}



export default AddWristo;
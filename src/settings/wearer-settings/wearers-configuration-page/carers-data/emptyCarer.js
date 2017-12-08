import React from 'react';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class EmptyCarer extends React.Component{ 
    
   
    render(){

        return (
        <div className="add-carer-wrap">
            <p className="add-carer-button-description">Click to add a new person who will be a carer</p>
              <button className="add-carer-button">
                    <svg className="add-wristo-button__icon" fill="#B52F54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="add-carer-button__name">Add New Carer</span>
              </button>
          </div>

        )
    }
}



export default EmptyCarer;
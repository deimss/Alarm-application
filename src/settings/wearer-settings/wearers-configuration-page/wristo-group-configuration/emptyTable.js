import React from 'react';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class EmptyTable extends React.Component{ 
  constructor(props) {
    super(props);
  };
 
    render(){
        return ( 
          <div className="wearerProfileWrap">
            <div className="wearerProfile__header">
              <p>Wristo configuration</p>
                <button className="addWristoDetails" >
                      <svg className="addWristoDetails__icon" fill="#B52F54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                      </svg>
                      <span className="addWristoDetails__name">Add Wristo Details</span>
                  </button>
            </div>
            <table className="wristo-configuration-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>SIM NUMBER</th>
                    <th>UNIQUE WRISTO ID</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>                    
                </tbody>
            </table>
          </div>
        )
    }
}



export default EmptyTable;
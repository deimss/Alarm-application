import React from 'react';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class AddCarer extends React.Component{ 
    
   constructor(props) {
    super(props);

    
    this.state = {
      
      newCarer: {'first_name': 'first_name', 'last_name': 'last_name', 'email': 'email@gmail.com', 'age':'', 'password': ''}
     
    };
};


    render(){

      return (
        <div className="wearerProfileWrap">
          <div className="wearerProfile__header">
            <p>Carers data</p>
              <button className="add-new-carer">
                    <svg className="add-new-carer__icon" fill="#B52F54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="add-new-carer__name">Add New Carer</span>
                </button>
          </div>
          
            <table className="carers-data-table">
              <thead>
                <tr>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>AGE</th>
                  <th>PASSWORD</th>
                  <th>PASSWORD CONFIRMATION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                  <tr key={dataElement.id.toString()}>
                    <td><input type='text' value={dataElement.id}         onChange={(event)=>this.handleInputChange(dataElement.id,        event)}/></td>
                    <td><input type='text' value={dataElement.master_id}  onChange={(event)=>this.handleInputChange(dataElement.master_id, event)}/></td>
                    <td><input type='text' value={dataElement.email}      onChange={(event)=>this.handleInputChange(dataElement.email,     event)}/></td>
                    <td><input type='text' value={dataElement.permition}  onChange={(event)=>this.handleInputChange(dataElement.permition, event)}/></td>
                    <td><input type='text' value={dataElement.permition}  onChange={(event)=>this.handleInputChange(dataElement.permition, event)}/></td>
                    <td>
                      <div className='profile-button'>
                          <button className="discard-edit-group" onClick={()=>this.handleDiscardChange(dataElement.id)}>
                            <svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                              <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                          </button>
                          <button className="save-edit-group">
                            <svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                          </button>
                      </div> 
                    </td>
                  </tr>
              </tbody>
          </table>
          </div>
        )
    }
}



export default AddCarer;
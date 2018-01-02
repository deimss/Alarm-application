import React from 'react';
import classNames from 'classnames';
import WearerError from '../wearer-error.js';
import WearersLoading from '../wearer-loading.js';
import AddWristo from './emptyWristo.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class AddNewWristo extends React.Component{ 
    
    constructor(props) {
    super(props);
    this.state = {
      isEdit: true,
      name:'',
      phone_number: '',
      unique_wristo_id: '',
      status: 'active',
      addNewWristo: false
     };
    this.backToConfig = this.backToConfig.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.setData = this.setData.bind(this);
  };


  handleChangeInput(inputName,event){ 
    if(inputName == 'name'){
      this.setState({name: event.target.value}) 
    }else if(inputName == 'phone_number'){
      this.setState({phone_number: event.target.value}) 
    }else if(inputName === 'unique_wristo_id'){
      this.setState({unique_wristo_id: event.target.value}) 
    }else if(inputName == 'status'){
      this.setState({status: event.target.value}) 
    }
  }

  setData(){
    let newData = {
      name: this.state.name,
      phone_number: this.state.phone_number,
      unique_wristo_id: this.state.unique_wristo_id,
      status: this.state.status,
      id: this.props.wearerID
    }
    this.props.addNewWristo(newData);
  }

  backToConfig(){
    this.props.changeStateAddNewWristo();
  }

  render(){
    let editRow = true;
      return (   
        <div className="wearerProfileWrap">
  			  <div className="wearerProfile__header">
            <p>Wristo configuration</p>
              <button className="addWristoDetails">
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
                  <tr >
                    <td><input type="text" onChange={(event) => this.handleChangeInput('name',event)}  value={this.state.name} /></td>
                    <td><input type="text" onChange={(event) => this.handleChangeInput('phone_number',event)}  value={this.state.phone_number} /></td>
                    <td><input type="text" onChange={(event) => this.handleChangeInput('unique_wristo_id',event)}  value={this.state.unique_wristo_id} disabled /></td>
                    <td>
                      <select  type="text" onChange={(event) => this.handleChangeInput('status',event)} ><option>
                      <option value='active' selected />active</option>
                      <option value='inactive' >inactive</option>
                      </select>
                    </td>
                    <td>
                      <div className="wristoDevicesButton">
                        <button className="delete-setting-button" onClick={this.backToConfig}><svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          <path d="M0 0h24v24H0z" fill="none"/>
                          </svg></button>
                        <button className="save-setting-button" onClick={this.setData}><svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"/>
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg></button>
                      </div>         
                    </td>
                  </tr>
              </tbody>
          </table>
        </div>
      )
  
  }
}

export default AddNewWristo;

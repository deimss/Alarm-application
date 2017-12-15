import React from 'react';
import classNames from 'classnames';
import WearerError from '../wearer-error.js';
import WearersLoading from '../wearer-loading.js';
import EmptyWristo from './emptyWristo.js';
import AddNewWristo from './newWristo.js';
import EmptyTable from './emptyTable.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WristoConfiguration extends React.Component{ 
    
    constructor(props) {
    super(props);
    this.state = {
      wearerDevice: [],
      isEdit: true,
      name:'',
      phone_number: '',
      unique_wristo_id: '',
      status: '',
      idElArray: null,
      editButton: true,
      toogleButton: true,
      addNewWristo: false,
      emptyWearerDevice: false,
      wearerID: this.props.wearerID
     };
    this.hadnleClickEditButton = this.hadnleClickEditButton.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleAddNewWristo = this.handleAddNewWristo.bind(this);
    this.changeStateAddNewWristo = this.changeStateAddNewWristo.bind(this);
  };


  componentWillMount() {        
      this.setState({
        wearerDevice: this.getDevicesData()
      })
  };
    
    getDevicesData(event){
      let dataDevices = [];
      this.props.wearerDeviceData.forEach(item => {
        dataDevices.push(Object.assign({}, item))
      })
      return dataDevices;
    }

  componentWillReceiveProps(nextProps){

    this.setState({
      wearerDevice: nextProps.wearerDeviceData,
      toogleButton: true,
      editButton: true,
      wearerID: nextProps.wearerID,
      addNewWristo: false,
      emptyWearerDevice: nextProps.addNewWearerClicked
    });
  }
  
  handleDiscardData(index){
    this.setState({ 
      isEdit: !this.state.isEdit,
      idElArray: index,
      editButton: !this.state.editButton,
      toogleButton: !this.state.toogleButton,
      wearerDevice: this.getDevicesData()
      })
  }

  changeStateAddNewWristo(){
    this.setState({
      addNewWristo: !this.state.addNewWristo
    });
  }

  handleAddNewWristo(event){
    this.props.addWearerDevices(event);
  }


  hadnleClickEditButton(index){
    let focusInp = this.state.wearerDevice.find(i => i.id === index);
    let currentObj = this.state.wearerDevice.indexOf(focusInp);
    let array = this.state.wearerDevice;    
    let toogleButton = this.state.toogleButton
    this.setState({
      isEdit: !this.state.isEdit,
      idElArray: index,
      editButton: !this.state.editButton,
      toogleButton: !this.state.toogleButton,
      wearerDevice: this.getDevicesData()
    })
  }

  handleChangeInput(nameField,idInput ,event){ 
    let focusInp = this.state.wearerDevice.find(i => i.id === idInput);
    let array = this.state.wearerDevice;
    let currentObj = this.state.wearerDevice.indexOf(focusInp);
    if(nameField == 'name'){
      array[currentObj].name = event.target.value; 
    }else if(nameField == 'phone_number'){
      array[currentObj].phone_number = event.target.value;
    }else if(nameField === 'unique_wristo_id'){
      array[currentObj].unique_wristo_id = event.target.value;
    }else if(nameField == 'status'){
      array[currentObj].status = event.target.value;
    }
      this.setState({
        wearerDevice: array
      })
  }

  setDataForDelete(event){
    let newData = {
      idDevice: event.id,
      name: event.name,
      phone_number: event.phone_number,
      status: event.status,
      id: this.props.wearerID
    }
    this.props.deleteWearerDevices(newData);
  }

  setData(event){
    let newData = {
      idDevice: event.id,
      name: event.name,
      phone_number: event.phone_number,
      status: event.status,
      id: this.props.wearerID
    }
    this.props.updateWearerDevices(newData);
    this.setState({ 
      isEdit: !this.state.isEdit,
      idElArray: null,
      editButton: !this.state.editButton,
      toogleButton: !this.state.toogleButton,

      })
  }

    render(){

const wristoDataTable = this.state.wearerDevice.map((wearerDeviceObject) => {

        if(this.props.wearerDeviceData.length !== 0 ) {  
          
          let disabledINp = 'disabled';
          let editRow = true;
          let toogleButton = true;
          if(wearerDeviceObject.id == this.state.idElArray){
             editRow = this.state.editRow;
             toogleButton = false;

          }
            return <tr key={wearerDeviceObject.id} id={wearerDeviceObject.id}>
            <td><input  type="text" onChange={(event) => this.handleChangeInput('name',wearerDeviceObject.id,event)}  value={wearerDeviceObject.name} disabled={editRow ? disabledINp : ''}/></td>
            <td><input  type="text" onChange={(event) => this.handleChangeInput('phone_number',wearerDeviceObject.id,event)}  value={wearerDeviceObject.phone_number} disabled={editRow ? disabledINp :''}/></td>
            <td><input  type="text" onChange={(event) => this.handleChangeInput('unique_wristo_id',wearerDeviceObject.id,event)}  value={wearerDeviceObject.unique_wristo_id} disabled={editRow ? disabledINp :''} readOnly/></td>
            <td>
              <select  type="text" onChange={(event) => this.handleChangeInput('status',wearerDeviceObject.id,event)}  disabled={editRow ? disabledINp :''}><option>
              <option value='active' selected = {wearerDeviceObject.status === 'active' ? 'selected' :''}/>active</option>
              <option value='inactive' selected={wearerDeviceObject.status === 'inactive' ? 'selected' :''} >inactive</option>
              </select>
            </td>
            <td>
              { toogleButton  ? <div> <button className="edit-group" onClick={()=> this.hadnleClickEditButton(wearerDeviceObject.id)}> 
                    <svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
                <button className="delete-group" onClick={()=>this.setDataForDelete(wearerDeviceObject)}>
                  <svg fill="#b52f54" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
        </button></div> :  <div className="wristoDevicesButton"><button className="delete-setting-button" onClick={()=> this.handleDiscardData()}><svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg></button>
            <button className="save-setting-button" onClick={()=>{this.setData(wearerDeviceObject)}}><svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg></button></div>
              }       
            </td>
          </tr>
          }
           
          
});

        return (
        <div>
        {
//<AddNewWristo addNewWristo = {this.handleAddNewWristo} wearerID={this.state.wearerID}/>
          this.props.error ? <WearerError /> : this.state.addNewWristo ? <AddNewWristo addNewWristo = {this.handleAddNewWristo}  changeStateAddNewWristo={this.changeStateAddNewWristo} wearerID={this.state.wearerID}/> : this.state.emptyWearerDevice ?  <EmptyTable /> : this.state.wearerDevice.length != 0  ? 
          <div className="wearerProfileWrap">
    			  <div className="wearerProfile__header">
              <p>Wristo configuration</p>
                <button className="addWristoDetails" onClick={this.changeStateAddNewWristo}>
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
                    {wristoDataTable}
                </tbody>
            </table>
          </div>
          : this.state.wearerID === this.props.firstIdWearer ? <EmptyTable /> :  <EmptyWristo changeStateAddNewWristo = {this.changeStateAddNewWristo} /> 
          } 
        </div>
        )
    
    }
}



export default WristoConfiguration;

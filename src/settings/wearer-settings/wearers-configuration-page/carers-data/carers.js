import React from 'react';
import classNames from 'classnames';
import WearerError from '../wearer-error.js';
import WearersLoading from '../wearer-loading.js';
import EmptyCarer from './emptyCarer.js';
import AddCarer from './addCarer.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Carers extends React.Component{ 
    
    constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditCarer = this.handleEditCarer.bind(this);
    this.handleDiscardChange = this.handleDiscardChange.bind(this);
    this.setCarersData = this.setCarersData.bind(this);
    // this.handleSaveChange = this.handleSaveChange.bind(this);
    this.handleDeleteCarer = this.handleDeleteCarer.bind(this);
    this.handleAddCarer = this.handleAddCarer.bind(this);
    this.handleDiscardNewCarer = this.handleDiscardNewCarer.bind(this);
    this.setData = this.setData.bind(this);
    
    this.state = {
      disabled: false,
      currentCarerId: null,
      rowEdited: false,
      addCarerClicked: false,
      carersData: []
    };

    
  };

    setData(id){

      this.setState({
        rowEdited: false,
        disabled: true
      });

      let currentCarer = this.state.carersData.find(element=> element.id === id);

      this.props.updateCarer(currentCarer);
    }

    setCarersData(){


     let arr = [];

      this.props.carers.forEach(function(element){
        arr.push(Object.assign({}, element));
      })
      this.setState({carersData: arr});

    };

    componentWillMount(){
      
      this.setCarersData();
   };

    componentWillReceiveProps(){
      this.setState({addCarerClicked: false});
    }

   
    handleInputChange(element, event){

      let data = this.state.carersData.find(i => i.id === this.state.currentCarerId);

 
      let currentElement = this.state.carersData.indexOf(data);

      let dataKey;
      
        for (let key in data){
          if (data[key] === element) dataKey = key
        };
      

  

      var newCarersData = this.state.carersData.slice(0);

      newCarersData[currentElement][dataKey] = event.target.value;

      this.setState({carersData: newCarersData});

 
    };

    handleAddCarer(){
      this.setState({addCarerClicked: true});
    };


    handleDeleteCarer(event){
      this.props.deleteCarer(event);
    };


    handleEditCarer(event){

      this.setState({currentCarerId: event});

      this.setState({disabled: false});
      this.setState({rowEdited: true});

      this.setCarersData();
    };

    

    handleDiscardChange(event){

       this.setState({rowEdited: false});
       this.setState({disabled: true});
       this.setCarersData();


    };

    handleDiscardNewCarer(){
       this.setState({addCarerClicked: false});

    };

    componentWillReceiveProps(){
      
    }


    render(){

      let carersBuffer = this.state.rowEdited ? this.state.carersData : this.props.carers;

      let rowKey = 0;

      let CarersDataTable = carersBuffer.map((dataElement) => {
      


      if(this.props.carers.length !== 0){

      let full_name = `${dataElement.first_name} ${dataElement.last_name}`

      let disableCarer = true;
      let editRow = false;

       if(dataElement.id === this.state.currentCarerId){
          disableCarer = this.state.disabled;
          editRow = this.state.rowEdited;
       };

       let inputStyle = classNames({
        'default-input': !editRow,
        'edit-input':  editRow
      });

       rowKey++;

        return <tr key={rowKey}>
              <td><input className={inputStyle} type='text' value={dataElement.first_name} disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.first_name, event)}/></td>
              <td><input className={inputStyle} type='text' value={dataElement.last_name}  disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.last_name,  event)}/></td>
              <td><input className={inputStyle} type='text' value={dataElement.email}      disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.email,      event)}/></td>
              <td><input className={inputStyle} type='text' value={dataElement.password}  disabled = {(disableCarer)? "disabled" : ""}  onChange={(event)=>this.handleInputChange(dataElement.password,   event)}/></td>
              <td>
              {
                (disableCarer == true && editRow == false) ? 
                <div className='profile-button'>
                  <button className="edit-group" onClick={()=>this.handleEditCarer(dataElement.id)}> 
                    <svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                  </button>
                  <button className="delete-group" onClick={()=>this.handleDeleteCarer(dataElement.id)}>
                    <svg fill="#b52f54" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                  </button> 
                </div>
                :
                <div className='profile-button'>
                    <button className="discard-edit-group" onClick={()=>this.handleDiscardChange(dataElement.id)}>
                      <svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                      </svg>
                    </button>
                    <button className="save-edit-group" onClick={()=>{this.setData(dataElement.id)}}>
                      <svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                    </button>
                </div> 
              }  
              </td>
            </tr>
      } 
});

        return (
          <div>
          {
            this.props.error ? <WearerError /> : 
            this.state.addCarerClicked ? <AddCarer addCarer = {this.props.addCarer} handleDiscardNewCarer = {this.handleDiscardNewCarer}/>
            :
            this.props.carers.length !== 0 ? 
        <div className="wearerProfileWrap">
  			  <div className="wearerProfile__header">
            <p>Carers data</p>
              <button className="add-new-carer" onClick={this.handleAddCarer}>
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
                  <th>LAST NUMBER</th>
                  <th>EMAIL</th>
                  <th>PASSWORD</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                  {CarersDataTable} 
              </tbody>
          </table>
          </div>
          :
            <EmptyCarer handleAddCarer = {this.handleAddCarer}/>
          }
          </div>

		    
        );
    }
}



export default Carers;


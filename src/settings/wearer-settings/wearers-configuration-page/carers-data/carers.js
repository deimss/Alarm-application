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
    
    this.state = {
      disabled: false,
      currentCarerId: null,
      rowEdited: false,
      addCarerClicked: false,
      // shouldRowUpdate: false,
      //discardChange: false,
      // valueId: '',
      // valueMaster_id: '',
      // valueEmail: '',
      // valueEmail: '',

      // carersData: this.props.carers.slice(0),

      carersData: []
      // CarersData : [
      // {'fullName': 'Full name', 'simNumber': '+380698632654', 'email': 'email@gmail.com', 'permition': 'master account'},
      // {'fullName': 'Full name', 'simNumber': '+380698632125', 'email': 'email@gmail.com', 'permition': 'view only'} 
      //              ]
    };

    
  };

    setCarersData(){

      console.log('setCarersData');

     let arr = [];

      this.props.carers.forEach(function(element){
        arr.push(Object.assign({}, element));
      })
      this.setState({carersData: arr});
      console.log("componentWillMount this.state.carersData", this.state.carersData); 
    };

    componentWillMount(){
      
      console.log("componentWillMount this.props.carers", this.props.carers);
      this.setCarersData();
      
      
    };
    componentWillReceiveProps(){
      this.setState({addCarerClicked: false});
    }

   
    handleInputChange(element, event){

      console.log('handleInputChange element ', element);
      console.log('handleInputChange event ', event.target);
      console.log('this.state.carersData', this.state.carersData);
      

      let data = this.state.carersData.find(i => i.id === this.state.currentCarerId);

 
      let currentElement = this.state.carersData.indexOf(data);

      let dataKey;
      
        for (let key in data){
          if (data[key] === element) dataKey = key
        };
      

      console.log('carers handleInputChange currentElement', currentElement);

      var newCarersData = this.state.carersData.slice(0);

      newCarersData[currentElement][dataKey] = event.target.value;

      console.log('newCarersData', newCarersData);

      this.setState({carersData: newCarersData});

      console.log("handleInputChange this.state.carersData", this.state.carersData);
      console.log("handleInputChange this.props.carers", this.props.carers);
  
    };

    handleAddCarer(){
      this.setState({addCarerClicked: true});
    };


    handleDeleteCarer(event){
      this.props.deleteCarer(event);
    };


    handleEditCarer(event){

      console.log('handleEditCarer');

      this.setState({currentCarerId: event});

      //this.setState({disabled: !this.state.disabled} )

      this.setState({disabled: false});
      this.setState({rowEdited: true});

      console.log('handleEditCarer event', event);
      this.setCarersData();
    };

    

    handleDiscardChange(event){
       console.log('handleDiscardChange');
       this.setState({rowEdited: false});
       this.setState({disabled: true});

       this.setCarersData();


    };

    handleDiscardNewCarer(){
       console.log('handleDiscardNewCarer');
       this.setState({addCarerClicked: false});

    };


    render(){

      console.log("this.state.carersData", this.state.carersData);
      console.log("this.props.carers", this.props.carers);


      let carersBuffer = this.state.rowEdited ? this.state.carersData : this.props.carers;

      let rowKey = 0;

      let CarersDataTable = carersBuffer.map((dataElement) => {
      
      console.log('carers dataElement', dataElement);

      if(this.props.carers.length !== 0){

      let disableCarer = true;
      let editRow = false;

       if(dataElement.id === this.state.currentCarerId){
          disableCarer = this.state.disabled;
          editRow = this.state.rowEdited;
       };

       console.log('disableCarer', disableCarer);


       rowKey++;

        return <tr key={rowKey}>
              <td><input type='text' value={dataElement.id}        disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.id,        event)}/></td>
              <td><input type='text' value={dataElement.master_id} disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.master_id, event)}/></td>
              <td><input type='text' value={dataElement.email}     disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.email,     event)}/></td>
              <td><input type='text' value={dataElement.permition} disabled = {(disableCarer)? "disabled" : ""} onChange={(event)=>this.handleInputChange(dataElement.permition, event)}/></td>
              <td>
              {
                (disableCarer == true && editRow == false) ? 
                <div>
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
                    <button className="save-edit-group">
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

// const carersDataNotFound = <tr key={Math.random().toString()}>
//               <td>---</td>
//               <td>---</td>
//               <td>---</td>
//               <td>---</td>
//               <td>
//                 {tableActions}   
//               </td>
//             </tr>;

        console.log('CarersDataTable', CarersDataTable);

        console.log('Carers this.state.addCarerClicked', this.state.addCarerClicked);
        

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
                  <th>FULL NAME</th>
                  <th>SIM NUMBER</th>
                  <th>EMAIL</th>
                  <th>PERMITION</th>
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


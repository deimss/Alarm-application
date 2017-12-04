import React from 'react';
import classNames from 'classnames';
import WearerError from '../wearer-error.js';
import WearersLoading from '../wearer-loading.js';
import AddCarer from './addCarer.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class CarersData extends React.Component{ 
    
    constructor(props) {
    super(props);
    // this.CreateWearersList = this.CreateWearersList.bind(this);
    // this.HandleSearch = this.HandleSearch.bind(this);
    this.state = {
      // CarersData : [
      // {'fullName': 'Full name', 'simNumber': '+380698632654', 'email': 'email@gmail.com', 'permition': 'master account'},
      // {'fullName': 'Full name', 'simNumber': '+380698632125', 'email': 'email@gmail.com', 'permition': 'view only'} 
      //              ]
    };
  };




    render(){

const tableActions = <div>
          <button className="edit-group"> 
              <svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </button>
          <button className="delete-group">
            <svg fill="#b52f54" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </div>;


      console.log('this.props.carers', this.props.carers);
      const CarersDataTable = this.props.carers.map((dataElement) => {
       console.log('carers dataElement', dataElement);

      if(this.props.carers.length !== 0){
        return <tr key={dataElement.id.toString()}>
              <td>{dataElement.id}</td>
              <td>{dataElement.master_id}</td>
              <td>{dataElement.email}</td>
              <td>{dataElement.permition}</td>
              <td>
                {tableActions}   
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

        return (
          <div>
          {
            this.props.error ? <WearerError /> : this.props.carers.length !== 0 ? 
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
            {AddCarer}
          }
          </div>

		    
        );
    }
}



export default CarersData;






          // <table className="carers-data-table">
          //     <thead>
          //       <tr>
          //         <th>FULL NAME</th>
          //         <th>SIM NUMBER</th>
          //         <th>EMAIL</th>
          //         <th>PERMITION</th>
          //         <th>ACTIONS</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //         {carersDataNotFound} 
          //     </tbody>
          // </table>